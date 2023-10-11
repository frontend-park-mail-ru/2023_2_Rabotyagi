/**
 * @file header.mjs
 * @module Header
 */

'use strict';
import { store } from '../../shared/store/store.mjs';
import { deleteCookie } from '../../shared/utils/cookie.mjs';
import { stringToElement } from '../../shared/utils/parsing.mjs';
import { ProfileBtn } from '../profileBtn/profileBtn.mjs';

/**
 * @class
 * @classdesc Класс страницы авторизации
 */
export class Header {
    /**
     * @method
     * @summary Метод рендера хедера
     */
    render() {
        const template = Handlebars.templates['header.hbs'];
        const profileBtn = new ProfileBtn();

        const context = {
            logo: {
                icon: '<div></div>',
            },
            search: {
                icon: '<div></div>',
            },
            signin: {
                caption: 'Войти',
            },
            signup: {
                caption: 'Зарегистрироваться',
            },
            authorized: store.user.isAuth(),
            profile: profileBtn.render(),
        };

        const root = stringToElement(template(context));

        root.querySelector('.profile-container')?.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                root.querySelector('#profile-dropdown').classList.toggle(
                    'hidden'
                );
            }
        );

        root.querySelector('#dropdown-btn-logout')?.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                store.user.clear();
                deleteCookie('access_token');
                Router.navigateTo('/signin');
            }
        );

        return root;
    }
}
