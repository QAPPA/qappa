import { Application, Request, Response } from 'express';
import usersController from './usersController';
import authenticationController from './authenticationController';
import projectController from './projectController';
import { authenticate, admin } from '../middleware/auth';

export default (app: Application) => {
    // unprotected endpoints:
    // POST /auth/login
    // POST /users
    app.use('/auth', authenticationController);
    app.use('/users', usersController);
    app.use('/projects', projectController);
    app.get('/protected', authenticate, (req: Request, res: Response) => {
        console.log('Inside protected');
        return res.sendStatus(200);
    });
    // for routes requiring user to be admin, you can use "[authenticate, authorize]" or its alias "admin"
    app.get('/protected/admin', admin, (req: Request, res: Response) => {
        console.log('Inside ADMIN protected');
        return res.sendStatus(200);
    });
};
