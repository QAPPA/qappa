import { Application } from 'express';
import users from './users';

export default (app: Application) => {
    app.use('/users', users);
};
