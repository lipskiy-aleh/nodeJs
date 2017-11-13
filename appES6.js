import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {sessionSecret} from './config/server';

import routes from './routes';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);


export default app;
