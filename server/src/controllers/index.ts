import { Application } from 'express';
import usersController from './usersController';

export default (app: Application) => {
    app.use('/users', usersController);
};
