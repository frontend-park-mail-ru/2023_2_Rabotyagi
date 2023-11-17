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

const buttons = {
    cart: {
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
    },
    logo: {
        id: 'logo-btn',
        variant: 'neutral',
        link: '/',
        leftIcon: svg({ content: logo }),
        text: {
            class: 'text-subheader',
            content: 'GoodsGalaxy',
        }
    },
    categories: {
        id: 'category',
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Категории'
        }
    },
    productCreate: {
        id: 'product-create',
        variant: 'neutral',
        subVariant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Разместить объявление'
        }
    },
    signin: {
        variant: 'primary',
        link: '/signin',
        text: {
            class: 'text-regular',
            content: 'Войти'
        }
    },
    signup: {
        variant: 'neutral',
        subVariant: 'primary',
        link: '/signup',
        text: {
            class: 'text-regular',
            content: 'Зарегистрироваться'
        }
    }

}

/**
 * @class
 * @classdesc Класс страницы авторизации
 */
export class Header {
    /**
     * @method
     * @summary Метод рендера хедера
     */

    constructor() {}

    updateCartButton() {
        const cartBtn = this.root.querySelector('#cart-btn');
        cartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/cart');
        }, { capture: false });
    }

    addEventListeners() {
        this.root.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )
    }

    renderProfile(nav) {
        const cartBtn = button(buttons.cart);
        const profileBtn = new ProfileBtn().render();

        store.cart.addListener(this.updateCartButton.bind(this));

        nav.append(cartBtn, profileBtn);
    }

    renderAuthBox(nav) {
        const authBox = document.createElement('div');
        authBox.classList.toggle('auth-box');

        const signinBtn = button(buttons.signin);
        const signupBtn = button(buttons.signup);

        authBox.append(signinBtn, signupBtn);
        nav.append(authBox);
    }

    async preRender() {
        store.categories.refresh();
        const authorized = store.user.isAuth();

        this.root = stringToElement(template());
        const nav = this.root.querySelector('nav');

        const logoBtn = button(buttons.logo);
        const productCreateBtn = button(buttons.productCreate);

        nav.appendChild(logoBtn);
        nav.appendChild(productCreateBtn);

        productCreateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/product', { mode: 'add' })
        })

        authorized ? this.renderProfile(nav) : this.renderAuthBox(nav);

        this.addEventListeners();
    }

    render() {
        this.preRender();
        return this.root;
    }
}
