import { Application, Request, Response } from 'express';
import usersController from './usersController';
import authenticationController from './authenticationController';
import { authenticate } from '../middleware/auth';

export default (app: Application) => {
    // unprotected endpoints:
    // POST /login
    // POST /users
    app.use('/login', authenticationController);
    app.use('/users', usersController);
    app.get('/protected', authenticate(), (req: Request, res: Response) => {
        console.log('Inside protected');
        return res.sendStatus(200);
    });
};
