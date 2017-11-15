import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { jwtSecretKey, google, twitter } from '../config/server';
import jwt from 'jsonwebtoken';
import { userMiddleware } from './';

import {twitterCallback, googleCallback} from '../routes/endpoints';

const usernameFieldName = 'login';
const passwordFieldName = 'password';

class Authentication {
    constructor() {
        passport.use(new LocalStrategy({
            usernameField: usernameFieldName,
            passwordField: passwordFieldName
        }, (username, password, done) => {
            userMiddleware.findUserByLoginAndPassword(username, password)
                .then(user => {
                    if(!user) {
                        throw 500;
                    }
                    done(null, user);
                }).catch(() => done(null, false, { message: 'Incorrect username.' }));
        }
        ));

        const googleCallbackUrl = googleCallback;
        passport.use(new GoogleStrategy({
            consumerKey: google.key,
            consumerSecret: google.secret,
            callbackURL: googleCallbackUrl,
        }, (token, tokenSecret, profile, done) => {
            console.log(profile);
            return done(err, { id: 1, name: 'Aleh0', login: 'aleh0', password: '1230' });
        }));

        const twitterCallbackUrl = twitterCallback;
        passport.use(new TwitterStrategy({
            consumerKey: twitter.key,
            consumerSecret: twitter.secret,
            callbackURL: twitterCallbackUrl
        }, (token, tokenSecret, profile, done) => {
            userMiddleware.findOrCreateByTwitterId(profile)
                .then(user => {console.log(user[0].dataValues); done(null, user[0].dataValues);});
        }));

        passport.serializeUser((user, done) => {
            console.log(user.id);
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            userMiddleware.findUserById(id)
                .then(currentUser => {
                    if(!currentUser) {
                        throw 500;
                    }
                    done(null, currentUser);
                }).catch(() => done(null, false));
        });
    }


    checkAuthJwt(req, res, next) {
        const token = req.headers.token;
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                res.json({
                    code: 403,
                    message: 'auth required'
                });
            } else {
                const userId = decoded.userId;
                req.user = userId;
                next();
            }
        });
    }

    checkAuth(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.json({
                code: 403,
                message: 'auth required'
            });
        }
    }

}

const authentication = new Authentication();
export default authentication;
