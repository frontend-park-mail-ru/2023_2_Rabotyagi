/**
 * @file main.js
 * @module Main
 */

import { MainPage } from './pages/main/main.mjs';
import { SigninPage } from './pages/signin/signin.mjs';
import { SignupPage } from './pages/signup/signup.mjs';
import { store } from './shared/store/store.mjs';
import { Route, Router } from './shared/services/router.mjs';

store.user.init();

window.Router = new Router([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
]);
