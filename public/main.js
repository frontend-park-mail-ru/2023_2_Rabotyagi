import {Header} from './components/header/header.mjs';
import {SigninPage} from './components/pages/signinPage.mjs';
import {SignupPage} from './components/pages/signupPage.mjs';
import {store} from './components/store.mjs';
import {Feed} from './components/posts/feed.mjs';

const rootElement = document.getElementById('root');

function renderMainPage() {
    rootElement.innerHTML = ''
    const header = new Header(rootElement)
    const feed = new Feed()


    header.render()
    rootElement.appendChild(feed.render())

    document.title = 'Супер Юла | Главная'
}

function renderSignInPage() {
    const signinPage = new SigninPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signinPage.render())
    document.title = 'Супер Юла | Вход'
}

function renderSignupPage() {
    const signupPage = new SignupPage()
    rootElement.innerHTML = ''
    rootElement.appendChild(signupPage.render())
    document.title = 'Супер Юла | Регистрация'
}

store.pages.appendPage('main', renderMainPage)
store.pages.appendPage('signin', renderSignInPage)
store.pages.appendPage('signup', renderSignupPage)

store.user.init()
renderMainPage()