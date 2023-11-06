import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './orderCard.hbs';
import './orderCard.scss';
import { Order } from '../../shared/api/order.js';
import button from '../button/button.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';

export class OrderCard {
    #order

    constructor(order) {
        this.#order = structuredClone(order);
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

    render() {
        const template = Template;

        const context = {
            product: this.#order.product,
        };

        const root = stringToElement(template(context));

        const deleteBtn = button({
            variant: 'accent',
            subVariant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Удалить'
            }
        });

        deleteBtn.addEventListener('click', (e) => {
            this.deleteOrder();
        });

        const container = root.querySelector('div.right-content');
        container.querySelector('#deleteBtn').replaceWith(deleteBtn);

        return root;
    }
}
