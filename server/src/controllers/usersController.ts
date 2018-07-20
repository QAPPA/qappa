import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).send('Sending all users');
});

router.post('/', async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = new User();
    user.name = req.body.user.name;
    try {
        const createdUser = await userRepository.save(user);
        return res.status(200).send(createdUser);
    } catch (error) {
        return res.status(500).send({ error });
    }
});

export default router;
