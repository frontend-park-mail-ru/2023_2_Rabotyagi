import { stringToElement } from '../../shared/utils/parsing.js';
import './card.scss'
import Handlebars from 'handlebars/runtime';
import template from './card.hbs'
import button from '../button/button.js';
import { Post } from '../../shared/api/post.js';
import ajax from '../../shared/services/ajax.js';

export class Card {
    constructor(context, variant='default') {
        this.context = context;
        this.variant = variant;
    }

    async changeActive(isActive, card) {
        let body = {};
        body.is_active = isActive;
        const res = await Post.patch(this.context.id, body);
        body = res.body;

        card.remove();
    }

    render() {
        Handlebars.registerHelper('isdefault', () => {
            return this.variant === 'default';
        });

        Handlebars.registerHelper('isprofile', () => {
            return this.variant === 'profile';
        });

        Handlebars.registerHelper('haveBadges', function () {
            return (this.safe_deal || this.delivery);
        });

        if (this.context.images) {
            this.context.image = ajax.ADRESS_BACKEND + this.context.images[ 0 ].url;
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
            const res = await Post.delete(Number(this.context.id));

            if (res.status === 200) {
                root.remove();
            }
        });

        if (this.variant === 'profile') {
            if (!this.context.is_active) {
                root.querySelector('#btn-delete').before(button({
                    id: 'btn-active',
                    variant: 'primary',
                    text: {
                        class: 'text-regular',
                        content: 'Активировать'
                    },
                    style: 'width: 100%;'
                }));
    
                root.querySelector('#btn-active').addEventListener('click', async (e) => {
                    e.stopPropagation();
    
                    this.changeActive(true, root);
                })
            }
            else {
                root.querySelector('#btn-delete').before(button({
                    id: 'btn-deactive',
                    variant: 'primary',
                    text: {
                        class: 'text-regular',
                        content: 'Деактивировать'
                    },
                    style: 'width: 100%;'
                }));
    
                root.querySelector('#btn-deactive').addEventListener('click', async (e) => {
                    e.stopPropagation();
    
                    this.changeActive(false, root);
                })
            }
        }

        return root;
    }
}
