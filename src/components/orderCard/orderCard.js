import template from './orderCard.hbs';
import './orderCard.scss';

import button from '../button/button.js';
import { Counter } from '../counter/counter.js';

import { Order } from '../../shared/api/order.js';
import statuses from '../../shared/statuses/statuses.js';

import { stringToElement } from '../../shared/utils/parsing.js';
import { getResourceUrl } from '../../shared/utils/getResource.js';

import dispatcher from '../../shared/dispatcher/dispatcher.js';

export class OrderCard {
    #order;
    #counter;
    #root;
    #deleteBtn;

    constructor(order) {
        this.#order = structuredClone({
            ...order,
            images: getResourceUrl(this.#order.images),

        });

        const context = {
            product: this.#order,
        };

        if (this.#order.images) {
            context.image = this.#order.images[ 0 ];
        }
        this.#root = stringToElement(template(context));

        this.#deleteBtn = button({
            variant: 'accent',
            subVariant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Удалить',
            },
        });

        this.#deleteBtn.addEventListener('click', () => {
            this.deleteOrder();
        });

        this.#counter = new Counter({
            unitPrice: Number(this.#order.price),
            minCount: 1,
            maxCount: Number(this.#order.available_count),
            currentCount: Number(this.#order.count),
            counterFunc: this.updateCount.bind(this),
        });
    }

    async updateCount(count) {
        try {
            const resp = await Order.updateCount({
                id: this.#order.id,
                count: count,
            });
            if (!statuses.IsSuccessfulRequest(resp)) {
                if (statuses.IsBadFormatRequest(resp)) {
                    throw statuses.USER_MESSAGE;
                }
                else if (statuses.IsInternalServerError(resp)) {
                    throw statuses.SERVER_MESSAGE;
                }
                else if (statuses.IsUserError(resp)) {
                    throw resp.body.error;
                }
            }
            dispatcher.dispatch({ type: 'UPDATE_COUNT_CART', payload: {
                orderId: Number(this.#order.id),
                count: count,
            } });
        } catch(err) {
            console.error(err);
        }
    }

    async deleteOrder() {
        try {
            const resp = await Order.deleteOrder(this.#order.id);

            if (!statuses.IsSuccessfulRequest(resp)) {
                if (statuses.IsBadFormatRequest(resp)) {
                    throw statuses.USER_MESSAGE;
                }
                else if (statuses.IsInternalServerError(resp)) {
                    throw statuses.SERVER_MESSAGE;
                }
                else if (statuses.IsUserError(resp)) {
                    throw resp.body.error;
                }
            }
            dispatcher.dispatch({ type: 'DELETE_GOOD', payload: this.#order.id });
        } catch(err) {
            // console.log(err);
        }
    }

    render() {
        const container = this.#root.querySelector('div.right-content');
        container.querySelector('#deleteBtn').replaceWith(this.#deleteBtn);
        container.querySelector('div.counter').replaceWith(this.#counter.render());

        return this.#root;
    }
}
