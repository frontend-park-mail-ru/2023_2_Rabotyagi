import template from './userCard.hbs';
import './userCard.scss';

import button from '../button/button.js';

import { stringToElement } from '../../shared/utils/parsing.js';

export class UserCard {
    #id;
    #name;
    #email;
    #image;

    constructor({ id, name, email, avatar }) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#image = avatar;
    }

    render() {
        const context = {
            name: this.#name,
            email: this.#email,
        };

        if (this.#image) {
            this.context.image.url = this.#image;
        }

        const goToSaler = button({
            variant: 'secondary',
            text: {
                class: 'text-regular',
                content: 'Посмотреть профиль',
            },
        });
        goToSaler.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/saler/products', { salerId: this.#id, variant: 'saler' });
        });

        const root = stringToElement(template(context));

        const container = root.querySelector('.user-info');
        container.querySelector('#goToSaler').replaceWith(goToSaler);

        return root;
    }
}
