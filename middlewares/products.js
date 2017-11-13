import {find} from 'lodash';

const defaultListOfProducts = [
    {id: 0, name: 'shoes'},
    {id: 1, name: 'shoes1'},
    {id: 2, name: 'shoes2'},
];

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
        this.products = defaultListOfProducts;
        this.reviews = productsReviews;
    }

    get allProducts() {
        return this.products;
    }

    addProduct(newProduct) {
        // Here should add uniq ID to new product
        this.products.push(newProduct);
    }

    getProductById(id) {
        return find(this.products, (product) => product.id === id);
    }

    getReviewsForProduct(id) {
        return this.reviews.filter((review) => review.productId === id);
    }
}

const products = new Products();
export default products;
