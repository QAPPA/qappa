import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import * as config from 'config';
import { User } from '../entities/User';
import { validate } from '../utils/validations/user';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.sendStatus(400);
    }
    const repository = getRepository(User);
    const user = await repository.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(400).send('Invalid email or password');
    }
    const token = jwt.sign(_.pick(user, ['id', 'admin']), config.get('jwtSecret'));
    res.status(200).send(token);
});

export default router;
