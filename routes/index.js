import express from 'express';
import passport from 'passport';
// import {authentication} from '../middlewares';

import * as endpoints from './endpoints';
// import loginRoutes from './login';
import authenticationJWT from './authenticationJWT';
import usersMethods from './users';
import productsMethods from './products';
import citiesMethods from './cities';

const router = express.Router();

function addLastModifiedData(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        req.body.lastModifiedDate = new Date();
    }
    next();
}

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
router.get(endpoints.users, addLastModifiedData, usersMethods.getAllUsers);
router.delete(endpoints.user, addLastModifiedData, usersMethods.deleteUserById);

router.get(endpoints.products, addLastModifiedData, productsMethods.getAllProduct);
router.post(endpoints.products, addLastModifiedData, productsMethods.addProduct);
router.get(endpoints.product, addLastModifiedData, productsMethods.getProductById);
router.delete(endpoints.product, addLastModifiedData, productsMethods.deleteProductById);
router.get(endpoints.productReview, addLastModifiedData, productsMethods.getReviewsById);

router.get(endpoints.cities, addLastModifiedData, citiesMethods.getAllCities);
router.post(endpoints.cities, addLastModifiedData, citiesMethods.addCity);
router.get(endpoints.city, addLastModifiedData, citiesMethods.getCityById);
router.put(endpoints.city, addLastModifiedData, citiesMethods.updateCity);
router.delete(endpoints.city, addLastModifiedData, citiesMethods.deleteCityById);

export default router;
