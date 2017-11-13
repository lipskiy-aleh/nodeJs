import {error400Text, productNotFoundText, reviewsNotFoundText} from './constant';
import {productsMiddleware} from '../middlewares';

class Products {

    getAllProduct(req, res) {
        res.json(productsMiddleware.allProducts);
    }

    addProduct(req, res) {
        productsMiddleware.addProduct(req.body);
        res.json(req.body);
    }

    getProductById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            const product = productsMiddleware.getProductById(id);
            if(product) {
                res.json(product);
            } else {
                res.status(404).send(productNotFoundText);
            }
        } else {
            res.status(400).send(error400Text);
        }
    }

    getReviewsById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            const reviews = productsMiddleware.getReviewsForProduct(id);
            if(reviews) {
                res.json(reviews);
            } else {
                res.status(404).send(reviewsNotFoundText);
            }
        } else {
            res.status(400).send(error400Text);
        }
    }
}

const products = new Products();
export default products;
