/**
 * @module mainPage
 * @file main.mjs
 */

import {Header} from "../../components/header/header.mjs";
import {Feed} from "../../components/feed/feed.mjs";

/**
 * @class mainPage
 * @summary Класс главной страницы
 */

export class MainPage {
    render() {
        const root = document.createElement('div');
        const header = new Header()
        const feed = new Feed(root)

        root.appendChild(header.render());
        root.appendChild(feed.render());
        document.title = 'Супер Юла | Главная';

        return root;
    }
}
