import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { User } from '../entities/User';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).send('Sending all users');
});

router.post('/', async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = new User();
    user.email = req.body.email;
    user.admin = true;
    try {
        user.password = await bcrypt.hash(req.body.password, 10);
        const createdUser = await userRepository.save(user);
        return res.status(200).send(_.pick(createdUser, ['id', 'email', 'admin']));
    } catch (error) {
        return res.status(500).send({ error });
    }
});

export default router;
