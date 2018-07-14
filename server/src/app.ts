import * as bodyParser from 'body-parser';
import * as express from 'express';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('port', 3001);

export default app;
