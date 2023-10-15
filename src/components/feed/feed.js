/**
 * @module Feed
 */

import { Card } from '../card/card.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { Post } from '../../shared/api/post.js';
import { loaderRegular } from '../loader/loader.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './feed.hbs'
import css from './feed.css'

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {
    async getPosts(container) {
        try {
            const resp = await Post.feed();
            if (resp.status != 200) {
                throw resp.body.error;
            }
            container.innerHTML = '';
            resp.body.forEach((elem) => {
                container.appendChild(new Card(elem).render());
            });
        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        }
    }

    render() {
        const template = Template;

        const context = {
            feedName: 'Все объявления',
        };

        const root = stringToElement(template(context));

        const container = root.querySelector('div.feed-content');
        container.appendChild(loaderRegular());

        this.getPosts(container);

        root.style = css;

        return root;
    }
}
