'use strict'
import {Header} from "./components/header.mjs"

const rootElement = document.getElementById('root');

function renderMainPage() {
    const header = new Header();
    rootElement.appendChild(header.render());
}

function renderSignInPage() {

}

function renderSignupPage() {

}


renderMainPage()