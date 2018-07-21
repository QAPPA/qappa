import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request, Response, Handler, NextFunction } from 'express';
import * as passport from 'passport';
import * as config from 'config';

const strategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwtSecret')
}, (jwtPayload, callback) => {
    callback(null, {
        id: jwtPayload.id,
        admin: jwtPayload.admin
    });
});
passport.use(strategy);

export function initializePassport(): Handler {
    return passport.initialize();
}

export function authenticate(req: Request, res: Response, next: NextFunction): any {
    passport.authenticate('jwt', { session: false })(req, res, next);
}
