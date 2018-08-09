import { Request, Response, Router } from 'express';
import * as _ from 'lodash';
import { getRepository } from 'typeorm';
import { admin } from '../middleware/auth';
import { validateCreate, validateEdit } from '../utils/validations/project';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { TeamRole } from '../entities/TeamRole';
import { ProjectUser } from '../entities/ProjectUser';

const router = Router();

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
    const projectUserRepository = getRepository(ProjectUser);
    const roleRepository = getRepository(TeamRole);

    const responsibleUser = await userRepository.findOne(validated.responsibleUserId);
    if (!responsibleUser) {
        return res.status(400).send({ message: 'Person responsible for the project doesn\'t exist' });
    }
    const userPromises = validated.users.map(async user => await userRepository.findOne(user.userId));
    let users;
    try {
        users = await Promise.all(userPromises);
    } catch {
        return res.status(400).send({ message: 'One or more people participating in the project don\'t exist' });
    }
    // roleIds are unique on their own but not all together
    // first, map users[] to their roleIds[], resulting in type number[][] like [[1, 2], [2], [3]]
    // lodash flattens it to [1, 2, 2, 3] and picks only unique values (no need for comparator since it's plain numbers)
    const uniqueRoleIds = _.uniq(_.flatten(validated.users.map(user => user.roleIds)));
    const rolePromises = uniqueRoleIds.map(async id => await roleRepository.findOne(id));
    let roles;
    try {
        roles = await Promise.all(rolePromises);
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
    const projectUserPromises = validated.users.map(async (validatedUser) => {
        const user = users.find(u => u.id === validatedUser.userId);
        const userRoles = validatedUser.roleIds.map(roleId => roles.find(r => r.id === roleId));
        const projectUser = new ProjectUser();
        projectUser.user = user;
        projectUser.project = savedProject;
        projectUser.roles = userRoles;
        await projectUserRepository.save(projectUser);
    });
    await Promise.all(projectUserPromises);
    // TODO: figure out what to send in response to avoid circular references in JSON
    return res.sendStatus(200);
});

// detail
router.get('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

// edit
router.put('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

// delete
router.delete('/:id(\\d+)', admin, (req: Request, res: Response) => {

});

// toggle state
router.put('/:id(\\d+)/toggle', admin, (req: Request, res: Response) => {

});

export default router;
