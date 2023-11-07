/**
 * @file header.js
 * @module Header
 */

'use strict';
import { store } from '../../shared/store/store.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import ProfileBtn from '../profileBtn/profileBtn.js';
import template from './header.hbs'
import './header.scss';
import button from '../button/button.js';
import svg from '../svg/svg.js';
import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';

/**
 * @class
 * @classdesc Класс страницы авторизации
 */
export class Header {
    /**
     * @method
     * @summary Метод рендера хедера
     */

    constructor() {
        this.template = Template;
        this.profileBtn = new ProfileBtn();
        this.context = {
            signin: {
                caption: 'Войти',
            },
            signup: {
                caption: 'Зарегистрироваться',
            },
            authorized: store.user.isAuth(),
            profile: store.user.isAuth() ? this.profileBtn.render() : null,
        };
        this.root = stringToElement(this.template(this.context));
        store.cart.addListener(this.updateCartButton.bind(this));
    }

    updateCartButton() {
        this.root.querySelector('#cart-btn').replaceWith(button({
            id: 'cart-btn',
            variant: 'neutral',
            link: '/cart',
            leftIcon: svg({ 
                content: cart,
                width: 28,
                height: 28
            }),
            text: {
                class: 'text-regular',
                content: store.cart.getCount(),
            }
        }));

        this.root.querySelector('#cart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/cart');
        }, { capture: false });
    }

    render() {
        this.root.querySelector('#logo-btn').replaceWith(button({
            id: 'logo-btn',
            variant: 'neutral',
            link: '/',
            leftIcon: svg({ content: logo }),
            text: {
                class: 'text-subheader',
                content: 'Супер Юла',
            }
        }));

        this.root.querySelector('#category').replaceWith(button({
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Категории'
            }
        }));

        this.root.querySelector('#product-create').replaceWith(button({
            variant: 'neutral',
            subVariant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Разместить объявление'
            }
        }));

        this.root.querySelector('#signin')?.replaceWith(button({
            variant: 'primary',
            link: '/signin',
            text: {
                class: 'text-regular',
                content: 'Войти'
            }
        }));

        this.root.querySelector('#signup')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'primary',
            link: '/signup',
            text: {
                class: 'text-regular',
                content: 'Зарегистрироваться'
            }
        }));

        this.root.querySelector('#cart-btn')?.replaceWith(button({
            id: 'cart-btn',
            variant: 'neutral',
            link: '/cart',
            leftIcon: svg({ 
                content: cart,
                width: 28,
                height: 28
            }),
            text: {
                class: 'text-regular',
                content: store.cart.getCount(),
            }
        }));

        this.root.querySelector('#profileBtn')?.replaceWith(this.profileBtn.render());

        this.root.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )
        
        return this.root;
    }
}
