/**
 * @file main.js
 * @module Main
 */

// import './assets/css/reset.scss';
// import './assets/css/styles.scss';
// import { MainPage } from './pages/main/main.js';
// import { SigninPage } from './pages/signin/signin.js';
// import { SignupPage } from './pages/signup/signup.js';
// import { store } from './shared/store/store.js';
// import { Router, Route } from './shared/services/router.js';
// import createMockServer from './mocks/mock.js';
// import Profile from './pages/profile/profile.js';
// import Cart from './pages/cart/cart';
// import ProductPage from './pages/product/product';

// const { NODE_ENV, MOCK } = process.env;

// if (NODE_ENV === 'development' && MOCK === 'true') {
//     createMockServer();
//     console.log('created mock server');
// }

// const root = document.querySelector('#root');

// await store.init();

// window.Router = new Router([
//     new Route(new RegExp('^/$'), new MainPage()),
//     new Route(new RegExp('^/signin$'), new SigninPage()),
//     new Route(new RegExp('^/signup$'), new SignupPage()),
//     new Route(new RegExp('^/profile.*'), new Profile()),
//     new Route(new RegExp('^/saler.*'), new Profile()),
//     new Route(new RegExp('^/cart$'), new Cart()),
//     new Route(new RegExp('^/product$'), new ProductPage()),
// ], root);

import "./assets/css/index.scss";
import { App } from "./App";

import { renderToElementDyId, createComponent } from "./components/baseComponents/snail/vdom/VirtualDOM";

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
}

renderApp();