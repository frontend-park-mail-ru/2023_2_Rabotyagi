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
import { Order } from './shared/api/order';

async function getOrders() {
    try {
        const resp = await Order.getCart();
        const body = await resp.json();
        if (resp.status != 200) {
            throw body.error;
        }
        store.cart.fullCart([...body.orders]);
    } catch(err) {
        console.log(err);
    }
}

if (process.env.NODE_ENV === 'development') {
    createMockServer();
    console.log('created mock server');
}

const root = document.querySelector('#root');

store.user.init();
store.cart.init();
getOrders();

window.Router = new Router([
    new Route(new RegExp('^/$'), new MainPage()),
    new Route(new RegExp('^/signin$'), new SigninPage()),
    new Route(new RegExp('^/signup$'), new SignupPage()),
    new Route(new RegExp('^/profile.*'), new Profile()),
    new Route(new RegExp('^/cart'), new Cart()),
    new Route(new RegExp('^/product'), new Product()),
], root);