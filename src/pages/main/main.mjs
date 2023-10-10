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
        const root = document.createElement('template');
        const header = new Header()
        const feed = new Feed(root)

        root.content.appendChild(header.render());
        root.content.appendChild(feed.render());
        document.title = 'Супер Юла | Главная';

        return root.content;
    }
}
