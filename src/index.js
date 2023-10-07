/**
 * @file main.js
 * @module Main
 */

import {MainPage} from './pages/main.js';
import {SigninPage} from './pages/signin.mjs';
import {SignupPage} from './pages/signup.mjs';
import {store} from './shared/constants/store.mjs';
import {Router, Route} from './shared/services/router.mjs';

/**
 * Корневой элемент сайта
 * @type {HTMLElement}
 */
// const rootElement = document.querySelector('#root');

store.user.init();

window.Router = new Router([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
]);
