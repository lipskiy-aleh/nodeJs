import express from 'express';
import {cookiesParser, queryParser} from '../middlewares';

import * as endpoints from './endpoints';
import usersMethods from './users';
import productsMethods from './products';


const router = express.Router();

router.get(endpoints.users, cookiesParser.cookieParser, queryParser.queryParser, usersMethods.getAllUsers);
router.get(endpoints.products, cookiesParser.cookieParser, queryParser.queryParser, productsMethods.getAllProduct);
router.post(endpoints.products, cookiesParser.cookieParser, queryParser.queryParser, productsMethods.addProduct);
router.get(endpoints.product, cookiesParser.cookieParser, queryParser.queryParser, productsMethods.getProductById);
router.get(endpoints.productReview, cookiesParser.cookieParser, queryParser.queryParser, productsMethods.getReviewsById);


export default router;
