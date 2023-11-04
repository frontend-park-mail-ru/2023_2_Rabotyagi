/**
 * @module OrderFeed
 */

import { store } from '../../shared/store/store.js';
import { OrderCard } from '../orderCard/orderCard.js';
import { UserCard } from '../userCard/userCard.js';
import { ErrorMessageBox } from '../error/errorMessageBox.js';
import { Order } from '../../shared/api/order.js';
import { loaderRegular } from '../loader/loader.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import button from '../button/button.js';
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
            fullPrice: store.cart.getPrice(),
        };

        const root = stringToElement(template(context));

        const buyBtn = button({
            variant: 'primary',
            subVariant: 'primary',
            style: 'margin-left: 24px;',
            text: {
                class: 'text-regular',
                content: 'Оплатить'
            }
        });

        const feedHeader = root.querySelector('div.order-feed-header');
        feedHeader.querySelector('#buyBtn').replaceWith(buyBtn);

        if (store.cart.hasUser()) {
            const saler = new UserCard(store.cart.state.saler);
            feedHeader.querySelector('#orderSaler').replaceWith(saler.render());
        }

        const feedContent = root.querySelector('div.order-feed-content');
        feedContent.appendChild(loaderRegular());

        this.getOrders(feedContent);

        return root;
    }
}
