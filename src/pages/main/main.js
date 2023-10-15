/**
 * @module mainPage
 * @file main.js
 */

import { Header } from '../../components/header/header.js';
import { Feed } from '../../components/feed/feed.js';

/**
 * @class mainPage
 * @summary Класс главной страницы
 */

export class MainPage {
    render() {
        const root = document.createElement('template');
        const header = new Header();
        const feed = new Feed(root);

        root.content.appendChild(header.render());
        root.content.appendChild(feed.render());
        document.title = 'Супер Юла | Главная';

        return root.content;
    }
}
