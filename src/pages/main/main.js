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
        const header = new Header();
        const feed = new Feed();

        document.title = 'GoodsGalaxy | Главная';

        return [ header.render(), feed.render() ];
    }
}
