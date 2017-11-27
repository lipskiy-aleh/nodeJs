const prefix = '/api';

export const auth = `/auth`;
export const login = `/login`;
export const googleLogin = '/login/google';
export const googleCallback = `${googleLogin}/callback`;
export const twitterLogin = '/login/twitter';
export const twitterCallback = `${twitterLogin}/callback`;

export const users = `${prefix}/users`;
export const user = `${prefix}/users/:id`;

export const products = `${prefix}/products`;
export const product = `${prefix}/products/:id`;
export const productReview = `${product}/reviews`;

export const cities = `${prefix}/cities`;
export const city = `${prefix}/cities/:id`;
