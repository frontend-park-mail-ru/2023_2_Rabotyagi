/**
 * @file main.js
 * @module Main
 */

import { MainPage } from './pages/main/main.js';
import { SigninPage } from './pages/signin/signin.js';
import { SignupPage } from './pages/signup/signup.js';
import { store } from './shared/store/store.js';
import Route from './shared/services/route.js';
import Router from './shared/services/router.js';
import createMockServer from './mocks/mock.js';
import Profile from './pages/profile/profile.js';

if (process.env.NODE_ENV === 'development') {
    createMockServer();
    console.log('created mock server');
}

store.user.init();

Router.addRoutes([
    new Route('/', new MainPage()),
    new Route('/signin', new SigninPage()),
    new Route('/signup', new SignupPage()),
    new Route('/profile', new Profile()),
])