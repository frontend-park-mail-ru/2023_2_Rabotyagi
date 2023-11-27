/**
 * @file header.js
 * @module Header
 */

'use strict';
import { store } from '../../shared/store/store.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import ProfileBtn from '../profileBtn/profileBtn.js';
import template from './header.hbs';
import './header.scss';
import button from '../button/button.js';
import svg from '../svg/svg.js';
import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';
import { Product } from '../../shared/api/product.js';
import Dropdown from '../dropdown/dropdown.js';

const buttons = {
    cart: {
        id: 'cart-btn',
        variant: 'neutral',
        link: '/cart',
        leftIcon: svg({
            content: cart,
            width: 28,
            height: 28,
        }),
        text: {
            class: 'text-regular',
            content: store.cart.getCount(),
        },
    },
    logo: {
        id: 'logo-btn',
        variant: 'neutral',
        link: '/',
        leftIcon: svg({ content: logo }),
        text: {
            class: 'text-subheader',
            content: 'GoodsGalaxy',
        },
    },
    categories: {
        id: 'category',
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Категории',
        },
    },
    productCreate: {
        id: 'product-create',
        variant: 'neutral',
        subVariant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Разместить объявление',
        },
    },
    signin: {
        variant: 'primary',
        link: '/signin',
        text: {
            class: 'text-regular',
            content: 'Войти',
        },
    },
    signup: {
        variant: 'neutral',
        subVariant: 'primary',
        link: '/signup',
        text: {
            class: 'text-regular',
            content: 'Зарегистрироваться',
        },
    },

};

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
        buttons.cart.text.content = store.cart.getCount();
        const buttonBox = this.root.querySelector('#cart-btn');
        const cartBtn = button(buttons.cart);
        cartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/cart');
        }, { capture: false });
        buttonBox.replaceWith(cartBtn);
    }

    // renderSuggestionBox(body) {
    //     const root = document.createElement('div');

    // }

    addEventListeners() {
        this.root.querySelectorAll('button[data-link]').forEach(item =>
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false }),
        );

        const form = this.root.querySelector('.search-box');
        const input = form.querySelector('input');

        input.addEventListener('input', async(e) => {
            form.querySelector('#search-dropdown')?.remove();

            if (input.value && (e.data || e.inputType === 'deleteContentBackward')) {
                const res = await Product.search(input.value);

                const dropdownContext = {
                    id: 'search-dropdown',
                    search: false,
                    items: () => {
                        let data = [];
                        if (res.status !== 222 && res.body) {
                            res.body.forEach((item, index) => {
                                data = [...data,
                                    [`item${index}`, item],
                                ];
                            });
                        }
                        else {
                            data = [
                                [null, 'Результатов поиска нет', true],
                            ];
                        }

                        return data;
                    },
                };

                const dropdown = new Dropdown(dropdownContext).render();
                dropdown.classList.toggle('hidden');

                dropdown.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    input.value = btn.querySelector('span').textContent;
                    input.dispatchEvent(new Event('input'));
                }));
                input.after(dropdown);

                return;
            }

            if (!e.data && e.inputType != 'deleteContentBackward') {
                setTimeout(() => form.dispatchEvent(new Event('submit')), 200);
            }
        });
        form.addEventListener('submit', async(e) => {
            e.preventDefault();

            const search = form.elements[0];
            const value = search.value;

            const res = await Product.searchFeed(value);
            window.Router.navigateTo('/', {
                products: res.body,
            });
        });
    }

    renderProfile(nav) {
        const cartBtn = button(buttons.cart);
        const profileBtn = new ProfileBtn().render();

        store.cart.addListener(this.updateCartButton.bind(this));
        nav.querySelector('#cart-btn').replaceWith(cartBtn);
        nav.querySelector('#profileBtn').replaceWith(profileBtn);
        nav.querySelector('#auth-box').remove();
    }

    renderAuthBox(nav) {
        const authBox = document.createElement('div');
        authBox.classList.toggle('auth-box');

        const signinBtn = button(buttons.signin);
        const signupBtn = button(buttons.signup);

        authBox.append(signinBtn, signupBtn);
        nav.querySelector('#auth-box').replaceWith(authBox);
        nav.querySelector('#cart-btn').remove();
        nav.querySelector('#profileBtn').remove();
    }

    async preRender() {
        buttons.cart.text.content = store.cart.getCount();
        store.categories.refresh();

        this.root = stringToElement(template());
        const nav = this.root.querySelector('nav');
        const logoBtn = button(buttons.logo);
        const productCreateBtn = button(buttons.productCreate);

        const authorized = store.user.isAuth();

        productCreateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (store.user.isAuth()) {
                window.Router.navigateTo('/product', { mode: 'add' });
            } else {
                window.Router.navigateTo('/signin');
            }
        });

        nav.querySelector('#logo-btn').replaceWith(logoBtn);
        nav.querySelector('#product-create').replaceWith(productCreateBtn);

        authorized ? this.renderProfile(nav) : this.renderAuthBox(nav);

        this.addEventListeners();
    }

    render() {
        this.preRender();

        return this.root;
    }
}
