import { loadDotEnv } from './config';
import 'reflect-metadata';
import Server from './server';
import { createConnection } from 'typeorm';

loadDotEnv(`${process.cwd()}/server/.env`);
createConnection()
.then((connection) => {
    new Server().start();
})
.catch(error => console.log(error));
