import { Application, Request, Response } from 'express';
import usersController from './usersController';
import login from './login';
import { authenticate } from '../config/auth';

export default (app: Application) => {
    app.post('/login', login);
    app.use('/users', usersController);
    app.get('/protected', authenticate(), (req: Request, res: Response) => {
        console.log('Inside protected');
        return res.sendStatus(200);
    });
};
