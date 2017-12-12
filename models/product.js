import {dbConnector} from '../helpers';
import {Schema} from 'mongoose';
import initProducts from '../data/products.json';

const modelName = 'Product';

const ProductSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    brand: {type: String},
    price: {
        type: Number,
        validate: {
            validator: v => (v >= 1),
            message: `{VALUE} is not a valid price value`
        },
    },
    options: {type: JSON}
});
const Product = dbConnector.model(modelName, ProductSchema);

function initData() {
    initProducts.forEach( el => new Product(el).save());
}
initData();

export default Product;
