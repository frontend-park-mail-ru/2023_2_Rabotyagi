/**
 * @file main.js
 * @module Main
 */

import './assets/css/reset.scss';
import './assets/css/styles.scss';
// import './assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf';
// import './assets/fonts/Roboto/Roboto-Regular.ttf';
// import './assets/fonts/Roboto/Roboto-Medium.ttf';

import { MainPage } from './pages/main/main.js';
import { SigninPage } from './pages/signin/signin.js';
import { SignupPage } from './pages/signup/signup.js';
import { store } from './shared/store/store.js';
import { Router, Route } from './shared/services/router.js';
import createMockServer from './mocks/mock.js';
import Profile from './pages/profile/profile.js';
import Cart from './pages/cart/cart';
import Product from './pages/product/product';
// import { Order } from './shared/api/order';
// import { UserApi } from './shared/api/user.js';


// class FullCart {
//     async getOrders() {
//         try {
//             const resp = await Order.getCart();
//             const body = resp.body;
//             if (resp.status != 200) {
//                 throw body.error;
//             }
//             store.cart.fullCart([ ...body ]);
//             if (body.length !== 0) {
//                 const respUser = await UserApi.getProfile(salerID);
//                 const bodyUser = respUser.body;
//                 if (respUser.status != 200) {
//                     throw bodyUser.error;
//                 }
//                 store.cart.updateUser(bodyUser);
//             }
//         } catch(err) {
//             console.log(err);
//         }
//     }
// };

if (process.env.NODE_ENV === 'development' && process.env.MOCK === true) {
    createMockServer();
    console.log('created mock server');
}

const root = document.querySelector('#root');

await store.init();

window.Router = new Router([
    new Route(new RegExp('^/$'), new MainPage()),
    new Route(new RegExp('^/signin$'), new SigninPage()),
    new Route(new RegExp('^/signup$'), new SignupPage()),
    new Route(new RegExp('^/profile.*'), new Profile()),
    new Route(new RegExp('^/cart$'), new Cart()),
    new Route(new RegExp('^/product$'), new Product()),
], root);
