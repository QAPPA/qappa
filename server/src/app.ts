import * as bodyParser from 'body-parser';
import router from './controllers';
import * as express from 'express';
import { initializePassport } from './config/auth';

const app: express.Application = express();
app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(initializePassport());

router(app);

export default app;
