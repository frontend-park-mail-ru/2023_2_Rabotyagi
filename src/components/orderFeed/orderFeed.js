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
import Template from './orderFeed.hbs';
import './orderFeed.scss';

/**
 * @class Блок с объявлениями
 * @description Получает товары из корзины с бекенда и формирует коллекцию для представления
 */
export class OrderFeed {
    constructor() {
        this.template = Template;
        this.context = {
            name: '',
            fullPrice: store.cart.getPrice(),
        };
        this.root = stringToElement(this.template(this.context));
        this.feedContent = this.root.querySelector('div.order-feed-content');
        store.cart.addListener(this.getOrders.bind(this));
    }

    getOrders() {
        if (store.cart.getCount() !== 0) {
            this.feedContent.innerHTML = '';
            store.cart.state.goods.forEach((elem) => {
                this.feedContent.appendChild(new OrderCard(elem.order).render());
            });
        } else {
            this.feedContent.innerHTML = 'Пока в корзине нет товаров';
        }
    }

    render() {
        const buyBtn = button({
            variant: 'primary',
            subVariant: 'primary',
            style: 'margin-left: 24px;',
            text: {
                class: 'text-regular',
                content: 'Оплатить'
            }
        });

        const feedHeader = this.root.querySelector('div.order-feed-header');
        if (store.cart.getCount() !== 0) {
            feedHeader.querySelector('#buyBtn').replaceWith(buyBtn);
        }

        if (store.cart.hasUser()) {
            const saler = new UserCard(store.cart.state.saler);
            feedHeader.querySelector('#orderSaler').replaceWith(saler.render());
        }

        this.feedContent.appendChild(loaderRegular());

        this.getOrders();

        return this.root;
    }
}
