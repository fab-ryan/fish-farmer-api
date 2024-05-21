/* eslint-disable import/no-extraneous-dependencies */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';

// import Database from '../database';
import { config } from '../config';
import Database from '../database';

type Payload = {
  id: string;
  iat: number;
  exp: number;
};

/**
 * The passport strategy.
 * @param {PassportStatic} passport The passport object.
 * @returns {void}
 */
export const passportStrategy = (passport: PassportStatic): void => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET,
  };

  passport.use(
    new Strategy(options, async (payload: Payload, done) => {
      try {
        const user = await Database.User.findOne({
          where: {
            id: payload.id,
          },
          include: [
            {
              model: Database.Role,
              as: 'role',
            },
          ],
        });
        if (!user) {
          return done(null, false);
        }
        const payloadUser = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        return done(null, payloadUser);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
