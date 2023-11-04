import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './orderCard.hbs';
import './orderCard.scss';
import button from '../button/button.js';

export class OrderCard {
    #order

    constructor(order) {
        this.#order = structuredClone(order);
    }

    render() {
        const template = Template;

        const context = {
            product: this.#order.product,
        };

        const root = stringToElement(template(context));

        return root;
    }
}
