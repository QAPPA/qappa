import { Application } from 'express';
import usersController from './usersController';

export const setControllers = (app: Application) => {
    app.use('/users', usersController);
};
