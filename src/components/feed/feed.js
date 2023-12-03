/**
 * @module Feed
 */
import template from './feed.hbs';
import './feed.scss';

import { Card } from '../card/card.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { loaderRegular } from '../loader/loader.js';

import { Product } from '../../shared/api/product.js';
import statuses from '../../shared/statuses/statuses.js';

import { stringToElement } from '../../shared/utils/parsing.js';

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {
    async getPosts(container) {
        try {
            const resp = await Product.feed();
            const body = resp.body;

            console.log(resp);

            if (!statuses.IsSuccessfulRequest(resp)) {
                if (statuses.IsBadFormatRequest(resp)) {
                    throw statuses.USER_MESSAGE;
                }
                else if (statuses.IsInternalServerError(resp)) {
                    throw statuses.SERVER_MESSAGE;
                }
                else if (statuses.IsUserError(resp)) {
                    throw body.error;
                }
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

    async preRender() {
        const context = {
            feedName: 'Все объявления',
        };

        this.root = stringToElement(template(context));

        const container = this.root.querySelector('div.feed-content');
        container.appendChild(loaderRegular());

        if (history.state && history.state.products) {
            container.innerHTML = '';

            history.state.products.forEach((elem) => container.appendChild(new Card(elem).render()));
        }
        else {
            await this.getPosts(container);
        }

    }

    render() {
        this.preRender();

        return this.root;
    }
}
