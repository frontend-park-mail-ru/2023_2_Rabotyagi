/**
 * @file header.mjs
 * @module Header
 */

'use strict';
import {store} from "../../shared/constants/store.mjs";

/**
 * @class
 * @classdesc Класс страницы авторизации
 */
export class Header {
    #parent;

    /**
     * @constructor
     * @param {HTMLElement} parent 
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * @method
     * @summary Метод рендера хедера
     */
    render() {
        const template = Handlebars.templates['header.hbs'];
        Handlebars.registerPartial('profile', Handlebars.templates['profileBtn.hbs']);
        Handlebars.registerPartial('dropdown', Handlebars.templates['dropdown.hbs']);

        const context = {
            logo: {
                icon: '<div></div>'
            },
            search: {
                icon: '<div></div>'
            },
            signin: {
                caption: 'Войти'
            },
            signup: {
                caption: 'Зарегистрироваться'
            },
            authorized: store.authorized,
            profileConf: {
                dropdownConf: {
                    id: 'profile-dropdown',
                    search: false,
                    items: {
                        ref: 'profileBtn',
                        content: [
                            [
                                'dropdown-btn-fav', 'Избранное'
                            ],
                            [
                                'dropdown-btn-profile', 'Профиль'
                            ],
                            [
                                'dropdown-btn-logout', 'Выйти'
                            ]
                        ]
                    }
                }
            }
        }

        this.#parent.innerHTML += template(context)

        // document.querySelector('#btn-signin') ?. addEventListener('click', (e) => {
        //     e.stopPropagation();
        //     window.router.navigateTo('/signin');
        //     // router.activePage = 'signin';
        //     // router.pages['signin']();
        // });

        document.querySelector('#btn-signup') ?. addEventListener('click', (e) => {
            e.stopPropagation();
            router.activePage = 'signup';
            router.pages['signup']();
        });

        document.querySelector('.profile-container') ?. addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('#profile-dropdown') ?. classList.toggle('hidden');
        });

        document.querySelector('#dropdown-btn-logout') ?. addEventListener('click', (e) => {
            e.stopPropagation();
            store.user.logout();
            router.activePage = 'signin';
            router.pages.redirect('signin');
        });
    }
}
