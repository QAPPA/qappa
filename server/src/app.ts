import * as bodyParser from 'body-parser';
import router from './controllers';
import * as express from 'express';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', 3001);
router(app);

export default app;
