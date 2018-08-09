import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import { admin } from '../middleware/auth';
import { validateCreate } from '../utils/validations/role';
import { TeamRole } from '../entities/TeamRole';

const router = Router();

// list all
router.get('/', admin, (req: Request, res: Response) => {

});

// add new
router.post('/', admin, async (req: Request, res: Response) => {
    const { error, value: validated } = validateCreate(req.body);
    if (error) {
        return res.status(400).send({ message: 'Name of the role is required' });
    }
    const repository = getRepository(TeamRole);
    const role = new TeamRole();
    role.name = validated.name;
    const saved = await repository.save(role); // can it fail?
    return res.status(201).send({ ...saved });
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

export default router;
