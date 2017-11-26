import Sequelize from 'sequelize';
import {dbConnector} from '../helpers';
import productsData from '../data/products.json';

const tableName = 'products';

const Product = dbConnector.define(tableName, {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    options: {
        type: Sequelize.JSON
    },
});

// Point 7 of HW. (import product data from model file)
Product.sync({force: true}).then(() => {
    productsData.map(product => {
        Product.create(product);
    });
});

export default Product;
