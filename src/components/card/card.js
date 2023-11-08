import { stringToElement } from '../../shared/utils/parsing.js';
import './card.scss'
import Handlebars from 'handlebars/runtime';
import template from './card.hbs'
import button from '../button/button.js';
import { Post } from '../../shared/api/post.js';

export class Card {
    constructor(context) {
        this.context = context;
    }

    render() {
        Handlebars.registerHelper('isdefault', function () {
            return this.variant !== undefined;
        });

        Handlebars.registerHelper('isprofile', function (value) {
            return value === 'profile';
        });

        Handlebars.registerHelper('haveBadges', function () {
            return (this.safe_deal || this.delivery);
        });

        if (this.context.images) {
            this.context.image = this.context.images[ 0 ].url;
        }

        const root = stringToElement(template(this.context));

        root.addEventListener('click', (e) => {
            e.stopPropagation();
            
            window.Router.navigateTo('/product', { productId: this.context.id })
        })

        root.querySelector('#btn-delete')?.replaceWith(button({
            id: 'btn-delete',
            variant: 'outlined',
            text: {
                class: 'text-regular',
                content: 'Удалить'
            },
            style: 'width: 100%;'
        }));

        root.querySelector('#btn-delete')?.addEventListener('click', async (e) => {
            e.stopPropagation();
            const res = await Post.delete(this.context.id);

            if (res.status === 200) {
                root.remove();
            }
        });

        return root;
    }
}
