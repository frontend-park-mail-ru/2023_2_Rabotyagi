import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './userCard.hbs';
import './userCard.scss';
import button from '../button/button.js';

export class UserCard {
    #name;
    #email;
    #image;

    constructor({ name, email, image }) {
        this.#name = name;
        this.#email = email;
        this.#image = image
    }

    render() {
        const template = Template;

        const context = {
            img: this.#image,
            name: this.#name,
            email: this.#email
        };

        const goToSaler = button({
            variant: 'secondary',
            text: {
                class: 'text-regular',
                content: 'Написать продавцу'
            }
        });

        console.log(this);
        console.log(context);

        const root = stringToElement(template(context));

        const container = root.querySelector('div.user-info');
        container.querySelector('#goToSaler').replaceWith(goToSaler);

        return root;
    }
}
