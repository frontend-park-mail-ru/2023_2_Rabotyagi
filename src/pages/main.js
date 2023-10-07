/**
 * @module mainPage
 * @file main.mjs
 */

import {Header} from "../components/header/header.mjs";
import {Feed} from "../components/feed/feed.mjs";

/**
 * @class mainPage
 * @summary Класс главной страницы
 */

export class MainPage {
    #rootElement;

    constructor(parent) {
        this.#rootElement = parent;
    }

    render() {
        this.#rootElement.innerHTML = ''

        const header = new Header(this.#rootElement)
        const feed = new Feed(this.#rootElement)

        header.render();
        feed.render();
        document.title = 'Супер Юла | Главная';
    }
}
