import { stringToElement } from '../../shared/utils/parsing.mjs';

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
        const template = Handlebars.templates[ 'card.hbs' ];

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

        return stringToElement(template(context));
    }
}
