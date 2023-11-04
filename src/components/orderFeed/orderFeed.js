/**
 * @module OrderFeed
 */

import { store } from '../../shared/store/store.js';
import { OrderCard } from '../orderCard/orderCard.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { Order } from '../../shared/api/order.js';
import { loaderRegular } from '../loader/loader.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './orderFeed.hbs'
import './orderFeed.scss'

/**
 * @class Блок с объявлениями
 * @description Получает товары из корзины с бекенда и формирует коллекцию для представления
 */
export class OrderFeed {
    getOrders(container) {
        if (store.cart.getCount() !== 0) {
            container.innerHTML = '';
            store.cart.state.goods.forEach((elem) => {
                container.appendChild(new OrderCard(elem.order).render());
            });
        } else {
            container.innerHTML = 'Пока в корзине нет товаров';
        }
    }

    render() {
        const template = Template;

        const context = {
            name: '',
        };

        const root = stringToElement(template(context));

        const container = root.querySelector('div.order-feed-content');
        container.appendChild(loaderRegular());

        this.getOrders(container);

        return root;
    }
}
