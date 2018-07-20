import { loadDotEnv } from './config';
import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';

loadDotEnv(`${process.cwd()}/server/.env`);
createConnection()
    .then(() => {
        console.log('Database connected');
        app.listen(app.get('port'), () => {
            console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
            console.log('Press CTRL-C to stop');
        });
    })
    .catch(error => console.log(error));
