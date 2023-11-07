/**
 * @module Feed
 */

import { Card } from '../card/card.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { Post } from '../../shared/api/post.js';
import { loaderRegular } from '../loader/loader.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import template from './feed.hbs'
import './feed.scss'

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {
    async getPosts(container) {
        try {
            const resp = await Post.feed();
            const body = await resp.json();

            switch (resp.status) {
                case 222:
                    throw resp.body.error;
                case 405:
                    throw "Method Not Allowed"
                case 500:
                    throw "Internal Server Error"
                default:
            }
            container.innerHTML = '';
            body.forEach((elem) => {
                container.appendChild(new Card(elem).render());
            });
        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        }
    }

    render() {
        const context = {
            feedName: 'Все объявления',
        };

        const root = stringToElement(template(context));

        const container = root.querySelector('div.feed-content');
        container.appendChild(loaderRegular());

        this.getPosts(container);

        return root;
    }
}
