import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { User } from '../entities/User';

export default async (req: Request, res: Response) => {
    console.log('Login request body:', req.body);
    // assume correct body now
    const repository = getRepository(User);
    const user = await repository.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401);
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401);
    }
    const token = jwt.sign(_.pick(user, ['id', 'admin']), process.env.JWT_SECRET);
    res.status(200).send(token);
};
