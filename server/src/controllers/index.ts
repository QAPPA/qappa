import { Application } from 'express';
import UsersController from './usersController';

export default (app: Application) => {
    app.use('/users', UsersController);
};
