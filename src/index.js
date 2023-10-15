/**
 * @file main.js
 * @module Main
 */

import { MainPage } from './pages/main/main.js';
import { SigninPage } from './pages/signin/signin.js';
import { SignupPage } from './pages/signup/signup.js';
import { store } from './shared/store/store.js';
import { Route, Router } from './shared/services/router.js';

store.user.init();

window.Router = new Router([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
]);
