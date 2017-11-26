import {error400Text, productNotFoundText, reviewsNotFoundText} from './constant';
import {productsMiddleware} from '../middlewares';

class Products {

    getAllProduct(req, res) {
        productsMiddleware.allProducts
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err));
    }

    addProduct(req, res) {
        productsMiddleware.addProduct(req.body)
            .then(newProduct => res.json(newProduct))
            .catch(err => res.status(500).send(err));
    }

    getProductById(req, res) {
        const id = Number(req.params.id);
        if(Number.isInteger(id)) {
            productsMiddleware.getProductById(id)
                .then(product => {
                    if(!product) {
                        throw 404;
                    }
                    res.json(product);
                })
                .catch(() => res.status(404).send(productNotFoundText));
        } else {
            res.status(400).send(error400Text);
        }
    }

    // Review table doesn`t migrate to postgresql yet.
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
