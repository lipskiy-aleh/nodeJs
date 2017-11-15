import {Product as productModel} from '../models';

const productsReviews = [
    {productId: 1, reviewName: 'Aleh', review: 'bla-bla-bla1'},
    {productId: 1, reviewName: 'Aleh', review: 'bla-bla-bla10'},
    {productId: 2, reviewName: 'Aleh', review: 'bla-bla-bla2'},
    {productId: 2, reviewName: 'Aleh', review: 'bla-bla-bla20'},
    {productId: 3, reviewName: 'Aleh', review: 'bla-bla-bla3'},
    {productId: 3, reviewName: 'Aleh', review: 'bla-bla-bla30'},
];

class Products {
    constructor() {
        this.reviews = productsReviews;
    }

    get allProducts() {
        return productModel.findAll();
    }

    addProduct(newProduct) {
        return productModel.create(newProduct);
    }

    getProductById(id) {
        return productModel.findById(id);
    }

    getReviewsForProduct(id) {
        return this.reviews.filter((review) => review.productId === id);
    }
}

const products = new Products();
export default products;
