/**
 * @file header.js
 * @module Header
 */

'use strict';
import { store } from '../../shared/store/store.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import ProfileBtn from '../profileBtn/profileBtn.js';
import Template from './header.hbs'
import css from './header.css'
import Router from '../../shared/services/router.js';

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
        const template = Template;
        const profileBtn = new ProfileBtn();

        const context = {
            signin: {
                caption: 'Войти',
            },
            signup: {
                caption: 'Зарегистрироваться',
            },
            authorized: store.user.isAuth(),
            profile: store.user.isAuth() ? profileBtn.render() : null,
        };

        const root = stringToElement(template(context));
        root.querySelector('#profileBtn')?.replaceWith(profileBtn.render());

        root.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )

        root.querySelector('.profile-container')?.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                root.querySelector('#profile-dropdown').classList.toggle(
                    'hidden'
                );
            }
        );
        
        root.style = css;

        return root;
    }
}
