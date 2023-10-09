/**
 * @module mainPage
 * @file main.mjs
 */

import {Header} from "../components/header/Header.mjs";
import {Feed} from "../components/feed/Feed.mjs";

/**
 * @class mainPage
 * @summary Класс главной страницы
 */

export class MainPage {
    render() {
        const root = document.createElement('div');
        const header = new Header(root)
        const feed = new Feed(root)

        root.appendChild(header.render());
        root.appendChild(feed.render());
        document.title = 'Супер Юла | Главная';

        return root;
    }
}
