/**
 * @file main.js
 * @module Main
 */

import {MainPage} from './pages/Main.js';
import {SigninPage} from './pages/Signin.mjs';
import {SignupPage} from './pages/Signup.mjs';
import {store} from './shared/constants/Store.mjs';
import {Router, Route} from './shared/services/Router.mjs';

store.user.init();

window.Router = new Router([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
]);
