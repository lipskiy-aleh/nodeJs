import express from 'express';
import passport from 'passport';
import {authentication} from '../middlewares';

import * as endpoints from './endpoints';
// import loginRoutes from './login';
import authenticationJWT from './authenticationJWT';
import usersMethods from './users';
import productsMethods from './products';

const router = express.Router();

// SECURITY
// router.use('/login', loginRoutes);
router.post(endpoints.auth, authenticationJWT.auth);
router.post(endpoints.login, passport.authenticate('local', {
    successRedirect: '/api/users', // Just for test should redirect to /
    failureRedirect: endpoints.products // '/login'
}));

router.get(endpoints.googleLogin, passport.authenticate('google'));
router.get(endpoints.googleCallback, passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => res.redirect('/'));

router.get(endpoints.twitterLogin, passport.authenticate('twitter'));
router.get(endpoints.twitterCallback, passport.authenticate('twitter', {
    successRedirect: '/api/users', // Just for test should redirect to /
    failureRedirect: endpoints.products // '/login'
}));


// API
// router.get(endpoints.users, authentication.checkAuth, usersMethods.getAllUsers);
// router.get(endpoints.products, authentication.checkAuth, productsMethods.getAllProduct);
// router.post(endpoints.products, authentication.checkAuth, productsMethods.addProduct);
// router.get(endpoints.product, authentication.checkAuth, productsMethods.getProductById);
// router.get(endpoints.productReview, authentication.checkAuth, productsMethods.getReviewsById);

router.get(endpoints.users, usersMethods.getAllUsers);
router.get(endpoints.products, productsMethods.getAllProduct);
router.post(endpoints.products, productsMethods.addProduct);
router.get(endpoints.product, productsMethods.getProductById);
router.get(endpoints.productReview, productsMethods.getReviewsById);

export default router;
