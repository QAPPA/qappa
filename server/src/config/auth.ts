import { Strategy, ExtractJwt } from 'passport-jwt';
import { Handler } from 'express';
import * as passport from 'passport';

export default function () {
    const strategy: Strategy = new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, callback) => {
        console.log('Inside Passport strategy, jwtPayload:', jwtPayload);
        // pass along user ID and status
        callback(null, {
            id: jwtPayload.id,
            admin: jwtPayload.admin
        });
    });
    passport.use(strategy);
    return {
        initialize(): Handler {
            return passport.initialize();
        },
        authenticate(): any {
            return passport.authenticate('jwt', { session: false });
        }
    };
}
