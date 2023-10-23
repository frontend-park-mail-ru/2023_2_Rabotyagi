/**
 * @file main.js
 * @module Main
 */

import { MainPage } from './pages/main/main.js';
import { SigninPage } from './pages/signin/signin.js';
import { SignupPage } from './pages/signup/signup.js';
import { store } from './shared/store/store.js';
import { Route, Router } from './shared/services/router.js';
import createMockServer from './mocks/mock.js';

if (process.env.NODE_ENV === 'development') {
    const mock = createMockServer();
    console.log('created mock server');
}

store.user.init();

window.Router = new Router([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
]);
