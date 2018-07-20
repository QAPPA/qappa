import * as bodyParser from 'body-parser';
import router from './controllers';
import * as express from 'express';
const passport = require('./config/auth')();

const app: express.Application = express();
app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());

router(app);

export default app;
