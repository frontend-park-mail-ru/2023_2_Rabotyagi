/**
 * @module Feed
 */

import { Card } from '../card/card.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { Product } from '../../shared/api/product.js';
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
            const resp = await Product.feed();
            const body = resp.body;

            if (resp.status !== 200) {
                throw resp.body.error;
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

        await this.getPosts(container);
    }

    render() {
        this.preRender();

        return this.root;
    }
}
