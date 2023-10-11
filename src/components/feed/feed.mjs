/**
 * @module Feed
 */

import { Card } from '../card/card.mjs';
import { ErrorMessageBox } from '../error/errorMessageBox.mjs';
import { Post } from '../../shared/api/post.mjs';
import { loaderRegular } from '../loader/loader.mjs';
import { stringToElement } from '../../shared/utils/parsing.mjs';

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
        const template = Handlebars.templates['feed.hbs'];

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
