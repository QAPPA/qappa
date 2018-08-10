import { Request, Response, Router } from 'express';
import * as _ from 'lodash';
import { getRepository } from 'typeorm';
import { admin } from '../middleware/auth';
import { ProjectCreateUser, validateCreate, validateEdit } from '../utils/validations/project';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { TeamRole } from '../entities/TeamRole';
import { ProjectUser } from '../entities/ProjectUser';

const router = Router();

function findUsersOrFail(users: ProjectCreateUser[]): Promise<User[]> {
    const userRepository = getRepository(User);
    const userPromises = users.map(user => userRepository.findOne(user.userId));
    return Promise.all(userPromises);
}

function findRolesOrFail(users: ProjectCreateUser[]): Promise<TeamRole[]> {
    const roleRepository = getRepository(TeamRole);
    // roleIds are unique on their own but not all together
    // first, map users[] to their roleIds[], resulting in type number[][] like [[1, 2], [2], [3]]
    // lodash flattens it to [1, 2, 2, 3] and picks only unique values (no need for comparator since it's plain numbers)
    const uniqueRoleIds = _.uniq(_.flatten(users.map(user => user.roleIds)));
    const rolePromises = uniqueRoleIds.map(id => roleRepository.findOne(id));
    return Promise.all(rolePromises);
}

function addProjectUsers(members: ProjectCreateUser[], users: User[], roles: TeamRole[], project: Project): Promise<ProjectUser[]> {
    const projectUserRepository = getRepository(ProjectUser);
    const projectUserPromises = members.map(async (validatedUser) => {
        const user = users.find(u => u.id === validatedUser.userId);
        const userRoles = validatedUser.roleIds.map(roleId => roles.find(r => r.id === roleId));
        const projectUser = new ProjectUser();
        projectUser.user = user;
        projectUser.project = project;
        projectUser.roles = userRoles;
        return projectUserRepository.save(projectUser);
    });
    return Promise.all(projectUserPromises);
}

// list all
router.get('/', admin, async (req: Request, res: Response) => {
    const repository = getRepository(Project);
    const all = await repository.find({
        relations: ['responsibleUser', 'users', 'users.roles', 'users.user']
    });
    const projects = all.map((project) => {
        const id = project.id;
        const name = project.name;
        const deadline = project.deadline;
        const open = project.open;
        const responsibleUser = _.pick(project.responsibleUser, ['id', 'name', 'surname']);
        const users = project.users.map((projectUser) => {
            const user = _.pick(projectUser.user, ['id', 'name', 'surname']);
            const roles = projectUser.roles.map(role => _.pick(role, ['id', 'name']));
            return {
                user,
                roles
            };
        });
        return {
            id,
            name,
            deadline,
            open,
            responsibleUser,
            users
        };
    });
    return res.status(200).send(projects);
});

// add new
router.post('/', admin, async (req: Request, res: Response) => {
    const { error, value: validated } = validateCreate(req.body);
    if (error) {
        return res.status(400).send({ message: 'Request has invalid body' });
    }
    // verify mentioned role and user IDs if they exist
    // they *should* be already unique (Joi) but that hasn't been tested yet
    const userRepository = getRepository(User);
    const projectRepository = getRepository(Project);

    const responsibleUser = await userRepository.findOne(validated.responsibleUserId);
    if (!responsibleUser) {
        return res.status(400).send({ message: 'Person responsible for the project doesn\'t exist' });
    }
    let users;
    try {
        users = await findUsersOrFail(validated.users);
    } catch {
        return res.status(400).send({ message: 'One or more people participating in the project don\'t exist' });
    }

    let roles;
    try {
        roles = await findRolesOrFail(validated.users);
    } catch {
        return res.status(400).send({ message: 'One or more used team roles don\'t exist' });
    }
    // all users and roles exist, finally assemble the project
    const project = new Project();
    project.name = validated.name;
    project.deadline = new Date(validated.deadline);
    project.open = true;
    project.responsibleUser = responsibleUser;
    const savedProject = await projectRepository.save(project);
    // typeorm doesn't seem to handle creating nested objects (creating whole project.users[]) and saving all at once
    // so additionally add users to the project with their roles
    await addProjectUsers(validated.users, users, roles, savedProject);
    // TODO: figure out what to send in response to avoid circular references in JSON
    return res.sendStatus(200);
});

// detail
router.get('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    const repository = getRepository(Project);
    const found = await repository.findOne(req.params.id, {
        relations: ['responsibleUser', 'users', 'users.user', 'users.roles']
    });
    if (!found) {
        return res.status(404).send({ message: 'Project doesn\'t exist' });
    }
    const project = {
        id: found.id,
        name: found.name,
        deadline: found.deadline,
        open: found.open,
        responsibleUserId: found.responsibleUser.id,
        users: found.users.map(projectUser => ({
            userId: projectUser.user.id,
            roleIds: projectUser.roles.map(role => role.id)
        }))
    };
    return res.status(200).send(project);
});

// edit
router.put('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    // largely similar to creating project
    const { error, value: validated } = validateEdit(req.body);
    if (error) {
        return res.status(400).send({ message: 'Request has invalid body' });
    }
    // verify mentioned role and user IDs if they exist
    // they *should* be already unique (Joi) but that hasn't been tested yet
    const userRepository = getRepository(User);
    const projectRepository = getRepository(Project);
    const projectUserRepository = getRepository(ProjectUser);

    const project = await projectRepository.findOne(req.params.id);
    if (!project) {
        return res.status(404).send({ message: 'Project doesn\'t exist' });
    }

    const responsibleUser = await userRepository.findOne(validated.responsibleUserId);
    if (!responsibleUser) {
        return res.status(400).send({ message: 'Person responsible for the project doesn\'t exist' });
    }
    let users;
    try {
        users = await findUsersOrFail(validated.users);
    } catch {
        return res.status(400).send({ message: 'One or more people participating in the project don\'t exist' });
    }

    let roles;
    try {
        roles = await findRolesOrFail(validated.users);
    } catch {
        return res.status(400).send({ message: 'One or more used team roles don\'t exist' });
    }

    // update project data, as for the project members, remove them and re-add them to be sure
    project.name = validated.name;
    project.deadline = new Date(validated.deadline);
    project.open = validated.open;
    project.responsibleUser = responsibleUser;
    const savedProject = await projectRepository.save(project);

    await projectUserRepository.delete({ project });

    await addProjectUsers(validated.users, users, roles, savedProject);
    // TODO: figure out what to send in response to avoid circular references in JSON
    return res.status(200).send({ message: 'Project successfully updated' });
});

// delete
router.delete('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    const repository = getRepository(Project);
    const project = await repository.findOne(req.params.id);
    if (!project) {
        return res.status(404).send({ message: 'Project doesn\'t exist' });
    }
    await repository.delete(project.id);
    return res.status(200).send({ message: 'Project successfully deleted' });
});

// toggle state
router.put('/:id(\\d+)/toggle', admin, async (req: Request, res: Response) => {
    const repository = getRepository(Project);
    const project = await repository.findOne(req.params.id);
    if (!project) {
        return res.status(404).send({ message: 'Project doesn\'t exist' });
    }
    project.open = !project.open;
    await repository.save(project);
    return res.status(200).send({ message: 'Project successfully toggled' });
});

export default router;
