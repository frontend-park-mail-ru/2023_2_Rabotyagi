'use strict'
import {Header} from "./components/header.mjs"
import { SigninPage } from "./components/signinPage.mjs";
import { SignupPage } from "./components/signupPage.mjs";
import { store } from "./components/store.mjs";
import { Feed } from "./components/posts/feed.mjs";

const rootElement = document.getElementById('root');

function renderMainPage() {
    const header = new Header()
    const feed = new Feed()
    rootElement.innerHTML = ''
    rootElement.appendChild(header.render())
    rootElement.appendChild(feed.render())
}

function renderSignInPage() {
    const signinPage = new SigninPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signinPage.render())
}

function renderSignupPage() {
    const signupPage = new SignupPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signupPage.render())
}

store.pages.appendPage('main', renderMainPage)
store.pages.appendPage('signin', renderSignInPage)
store.pages.appendPage('signup', renderSignupPage)

store.user.init()
renderMainPage()