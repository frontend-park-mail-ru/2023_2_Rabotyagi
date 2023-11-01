import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './card.hbs';
import './card.scss';
import { store } from '../../shared/store/store.js';
import { Order } from '../../shared/api/order.js';

export class Card {
    #id;
    #title;
    #city;
    #price;
    #image;

    constructor({ id, title, city, price, image }) {
        this.#id = id;
        this.#title = title;
        this.#city = city;
        this.#price = price;
        this.#image = image
    }

    async putInCart(product) {
        try {
            const resp = await Order.create(product);
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            store.cart.addInCart({...body});
            window.Router.navigateTo('/product/' + this.#id);
        } catch(err) {
            console.log(err);
            window.Router.navigateTo('/product/' + this.#id);
        }
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
            this.putInCart({
                "id": this.#id,
                "title": this.#title,
                "city": this.#city,
                "price": this.#price,
                "image": this.#image,
            });
        });

        return root;
    }
}
