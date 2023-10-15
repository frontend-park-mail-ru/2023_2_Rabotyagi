import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './card.hbs'
import css from './card.css'

export class Card {
    #title;
    #desc;
    #city;
    #price;
    constructor({ title, city, price }) {
        this.#title = title;
        // this.#desc = desc
        this.#city = city;
        this.#price = price;
    }

    render() {
        const template = Template;

        const context = {
            badges: {
                safeDeal: false,
                delivery: false,
                city: this.#city,
            },
            // img: {
            //     src: null,
            //     alt: 'картинка'
            // },
            cardInfo: {
                price: this.#price,
                title: this.#title,
            },
        };

        const root = stringToElement(template(context));
        root.style = css;

        return root;
    }
}
