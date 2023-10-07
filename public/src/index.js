/**
 * @file main.js
 * @module Main
 */
import {Header} from './components/header/header.mjs';
import {SigninPage} from './pages/signinPage.mjs';
import {SignupPage} from './pages/signupPage.mjs';
import {store} from './shared/constants/store.mjs';
import {router} from './pages/router.mjs';
import {Feed} from './components/feed/feed.mjs';

/**
 * Корневой элемент сайта
 * @type {HTMLElement}
 */
const rootElement = document.querySelector('#root');


/**
 * Функция рендера главной страницы
 * @borrows rootElement, Header, Feed
 * @returns None
 */
function renderMainPage() {
    rootElement.innerHTML = ''
    const header = new Header(rootElement)
    const feed = new Feed()


    header.render()
    rootElement.appendChild(feed.render())

    document.title = 'Супер Юла | Главная'
}

/**
 * Функция рендера страницы входа
 * @borrows rootElement, SigninPage
 * @returns None
 */
function renderSignInPage() {
    const signinPage = new SigninPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signinPage.render())
    document.title = 'Супер Юла | Вход'
}

/**
 * Функция рендера страницы регистрации
 * @borrows rootElement, SignupPage
 * @returns None
 */
function renderSignupPage() {
    const signupPage = new SignupPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signupPage.render())
    document.title = 'Супер Юла | Регистрация'
}

router.init({'main': renderMainPage, 'signin': renderSignInPage, 'signup': renderSignupPage})

store.user.init()
renderMainPage()
