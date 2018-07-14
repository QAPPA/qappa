import * as bodyParser from 'body-parser';
import router from './controllers';
import * as express from 'express';
import loadDotEnv from './config';

loadDotEnv(`${process.cwd()}/server/.env`);
const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', process.env.PORT || 3001);
router(app);

export default app;
