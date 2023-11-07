import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './card.hbs';
import './card.scss';

export class Card {
    #id;
    #title;
    #city;
    #price;
    #image;

    constructor({ id, title, city, price, images }) {
        this.#id = id;
        this.#title = title;
        this.#city = city;
        this.#price = price;
        this.#image = images[0].url;
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

        root.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/product/' + this.#id);
        });

        return root;
    }
}
