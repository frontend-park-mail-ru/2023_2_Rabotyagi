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
import template from './orderFeed.hbs';
import './orderFeed.scss';
import dispatcher from '../../shared/dispatcher/dispatcher.js';

/**
 * @class Блок с объявлениями
 * @description Получает товары из корзины с бекенда и формирует коллекцию для представления
 */
export class OrderFeed {
    constructor() {
        this.context = {
            name: '',
            fullPrice: store.cart.getPrice(),
        };
        this.buyBtn = button({
            id: 'buyBtn',
            variant: 'primary',
            subVariant: 'primary',
            style: 'margin-left: 24px;',
            text: {
                class: 'text-regular',
                content: 'Оплатить'
            }
        });
        this.buyBtn.addEventListener('click', (e) => {
            this.buyAll();
        });
        this.root = stringToElement(template(this.context));
        this.feedHeader = this.root.querySelector('div.order-feed-header');
        this.feedContent = this.root.querySelector('div.order-feed-content');
        store.cart.addListener(this.getOrders.bind(this));
    }

    async buyAll() {
        try {
            const resp = await Order.buyAll();
            const body = resp.body;
            if (resp.status != 200) {
                throw body.error;
            }
            dispatcher.dispatch({ type: 'BUY_ALL' });
        } catch(err) {
            console.log(err);
        }
    }

    getOrders() {
        if (store.cart.getCount() !== 0) {
            this.feedContent.innerHTML = '';
            store.cart.state.goods.forEach((elem) => {
                this.feedContent.appendChild(new OrderCard(elem).render());
            });
            this.feedHeader.querySelector('#order-full-price').innerHTML = store.cart.getPrice();
            if (store.cart.hasUser()) {
                const saler = new UserCard(store.cart.state.saler);
                this.feedHeader.querySelector('#userCard').replaceWith(saler.render());
            }
            this.feedHeader.querySelector('#buyBtn').replaceWith(this.buyBtn);
        } else {
            const deletingBuyBtn = this.feedHeader.querySelector('#buyBtn');
            const parentElement = deletingBuyBtn.parentNode;
            parentElement.removeChild(deletingBuyBtn);
            const newBuyBtn = document.createElement("div");
            newBuyBtn.id = 'buyBtn';
            parentElement.appendChild(newBuyBtn);
            newBuyBtn.addEventListener('click', (e) => {
                this.buyAll();
            });
            this.feedHeader.querySelector('#userCard').classList.remove('user-card');
            this.feedHeader.querySelector('#userCard').innerHTML = '';
            this.feedHeader.querySelector('#order-full-price').innerHTML = 0;
            this.feedContent.innerHTML = 'Пока в корзине нет товаров';
        }
    }

    render() {
        if (store.cart.getCount() !== 0) {
            this.feedHeader.querySelector('#buyBtn').replaceWith(this.buyBtn);
        }

        if (store.cart.hasUser()) {
            const saler = new UserCard(store.cart.state.saler);
            this.feedHeader.querySelector('#userCard').replaceWith(saler.render());
        }

        this.feedContent.appendChild(loaderRegular());

        this.getOrders();

        return this.root;
    }
}
