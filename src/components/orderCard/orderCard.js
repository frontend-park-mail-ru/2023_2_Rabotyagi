import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './orderCard.hbs';
import './orderCard.scss';
import { Order } from '../../shared/api/order.js';
import button from '../button/button.js';
import { Counter } from '../counter/counter.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';

// import { store } from '../../shared/store/store.js';

export class OrderCard {
    #order

    constructor(order) {
        this.#order = structuredClone(order);
        console.log('order', order);

        this.template = Template;
        this.context = {
            product: this.#order,
            image: this.#order.images[ 0 ].url,
        };
        this.root = stringToElement(this.template(this.context));

        this.deleteBtn = button({
            variant: 'accent',
            subVariant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Удалить'
            }
        });

        this.deleteBtn.addEventListener('click', () => {
            this.deleteOrder();
        });

        this.counter = new Counter({
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
                count: count
            });
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            dispatcher.dispatch({ type: 'UPDATE_COUNT_CART', payload: {
                orderId: Number(this.#order.id),
                count: count
            } });
        } catch(err) {
            console.log(err);
        }
    }

    async deleteOrder() {
        try {
            const resp = await Order.deleteOrder(this.#order.id);
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            dispatcher.dispatch({ type: 'DELETE_GOOD', payload: this.#order.id });
        } catch(err) {
            console.log(err);
        }
    }

    async patchOrder() {

    }
 
    render() {
        const container = this.root.querySelector('div.right-content');
        container.querySelector('#deleteBtn').replaceWith(this.deleteBtn);
        container.querySelector('div.counter').replaceWith(this.counter.render());

        return this.root;
    }
}
