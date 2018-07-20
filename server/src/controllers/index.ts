import { Application, Request, Response } from 'express';
import usersController from './usersController';
import login from './login';
import { authenticate } from '../middleware/auth';

export default (app: Application) => {
    // unprotected endpoints:
    // POST /login
    // POST /users
    app.post('/login', login);
    app.use('/users', usersController);
    app.get('/protected', authenticate(), (req: Request, res: Response) => {
        console.log('Inside protected');
        return res.sendStatus(200);
    });
};
