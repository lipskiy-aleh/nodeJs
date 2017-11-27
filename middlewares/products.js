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
        return productModel.find({});
    }

    addProduct(newProduct) {
        return new Promise((resolve, reject) => {
            new productModel(newProduct).save(err => {
                if(err) {
                    reject('product not saved ' + err);
                } else {
                    console.log('product saved');
                    resolve(newProduct);
                }
            });
        });
    }

    getProductById(id) {
        return productModel.find({ id: id });
    }

    deleteProductById(id) {
        return productModel.remove({ id: id});
    }

    getReviewsForProduct(id) {
        return this.reviews.filter((review) => review.productId === id);
    }
}

const products = new Products();
export default products;
