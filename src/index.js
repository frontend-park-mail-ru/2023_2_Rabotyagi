/**
 * @file main.js
 * @module Main
 */

import { MainPage } from './pages/main/main.js';
import { SigninPage } from './pages/signin/signin.js';
import { SignupPage } from './pages/signup/signup.js';
import { store } from './shared/store/store.js';
import { Router, Route } from './shared/services/router.js';
import createMockServer from './mocks/mock.js';
import Profile from './pages/profile/profile.js';
import styles from './assets/css/styles.scss' //eslint-disable-line no-unused-vars

if (process.env.NODE_ENV === 'development') {
    createMockServer();
    console.log('created mock server');
}

const root = document.querySelector('#root');

store.user.init();

window.Router = new Router([
    new Route(new R, new MainPage()),
    new Route(new RegExp('^/signin$'), new SigninPage()),
    new Route(new RegExp('^/signup$'), new SignupPage()),
    new Route(new RegExp('^/profile.*'), new Profile()),
], root);