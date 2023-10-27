import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './card.hbs'
import css from './card.css'

export class Card {
    #title;
    #city;
    #price;
    #image;

    constructor({ title, city, price, image }) {
        this.#title = title;
        this.#city = city;
        this.#price = price;
        this.#image = image
    }

    render() {
        const template = Template;

        const context = {
            badges: {
                safeDeal: false,
                delivery: false,
                city: this.#city,
            },
            img: this.#image,
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
