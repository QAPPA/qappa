import { Application } from 'express';
import usersController from './usersController';
import login from './login';

export default (app: Application) => {
    app.post('/login', login);
    app.use('/users', usersController);
};
