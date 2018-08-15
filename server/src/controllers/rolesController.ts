import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import { admin } from '../middleware/auth';
import { validate } from '../utils/validations/role';
import { TeamRole } from '../entities/TeamRole';

const router = Router();

// list all
router.get('/', admin, async (req: Request, res: Response) => {
    const repository = getRepository(TeamRole);
    const roles = await repository.find();
    res.status(200).send(roles);
});

// add new
router.post('/', admin, async (req: Request, res: Response) => {
    const { error, value: validated } = validate(req.body);
    if (error) {
        return res.status(400).send({ message: 'Name of the role is required' });
    }
    const repository = getRepository(TeamRole);
    const role = new TeamRole();
    role.name = validated.name;
    const saved = await repository.save(role); // can it fail?
    // TODO: inconsistency, either change all creating methods to 201 Created or this one to 200 OK
    return res.status(201).send(saved);
});

// detail
router.get('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    // regex in path should ensure id exists and is a number
    const repository = getRepository(TeamRole);
    const role = await repository.findOne({ id: req.params.id });
    if (!role) {
        return res.status(404).send({ message: 'Role doesn\'t exist' });
    }
    res.status(200).send(role);
});

// edit
router.put('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    const repository = getRepository(TeamRole);
    const role = await repository.findOne({ id: req.params.id });
    if (!role) {
        return res.status(404).send({ message: 'Role doesn\'t exist' });
    }
    const { error, value: validated } = validate(req.body);
    if (error) {
        return res.status(400).send({ message: 'Name of the role is required ' });
    }
    role.name = validated.name;
    const saved = await repository.save(role);
    res.status(200).send(saved);
});

// delete
router.delete('/:id(\\d+)', admin, async (req: Request, res: Response) => {
    const repository = getRepository(TeamRole);
    const role = await repository.findOne({ id: req.params.id });
    if (!role) {
        return res.status(404).send({ message: 'Role doesn\'t exist' });
    }
    await repository.delete(role.id);
    // maybe return deleted role instead?
    res.status(200).send({ message: 'Role was deleted successfully' });
});

export default router;
