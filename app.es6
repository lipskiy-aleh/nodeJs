import {appName} from 'config/server';
import {User, Product} from 'models';

// HW1
const user = new User();
const product = new Product();
console.log(appName);

// Need for eslint(no-unused-vars)
console.log(user);
console.log(product);

