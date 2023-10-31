import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './card.hbs';
import './card.scss';
import { store } from '../../shared/store/store.js';

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

        root.addEventListener('click', (e) => {
            e.stopPropagation();
            store.cart.addInCart({
                title: this.#title,
                city: this.#city,
                price: this.#price,
                image: this.#image,
            });
            window.Router.navigateTo('/product');
        })

        return root;
    }
}
