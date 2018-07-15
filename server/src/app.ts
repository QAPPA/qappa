import * as bodyParser from 'body-parser';
import { setControllers } from './controllers';
import * as express from 'express';
import { loadDotEnv } from './config';

loadDotEnv(`${process.cwd()}/server/.env`);
const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', process.env.PORT || 3001);
setControllers(app);

export default app;
