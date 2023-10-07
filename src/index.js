/**
 * @file main.js
 * @module Main
 */

import {MainPage} from './pages/main.js';
import {SigninPage} from './pages/signin.mjs';
import {SignupPage} from './pages/signup.mjs';
import {store} from './shared/constants/store.mjs';
import {Router, Route} from './pages/router.mjs';

/**
 * Корневой элемент сайта
 * @type {HTMLElement}
 */
const rootElement = document.querySelector('#root');

store.user.init();

const routes = [
    new Route('/', new MainPage(rootElement)),
    new Route('/signin', new SigninPage(rootElement)),
    new Route('/signup', new SignupPage(rootElement)),
];

new Router(routes);
