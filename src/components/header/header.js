/**
 * @file header.js
 * @module Header
 */

'use strict';
import { store } from '../../shared/store/store.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import ProfileBtn from '../profileBtn/profileBtn.js';
import Template from './header.hbs'
import './header.scss';
import button from '../button/button.js';
import svg from '../svg/svg.js';
import logo from '../../assets/icons/logo.svg'

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

        root.querySelector('#logo-btn').replaceWith(button({
            id: 'logo-btn',
            variant: 'neutral',
            link: '/',
            leftIcon: svg({ content: logo }),
            text: {
                class: 'text-subheader',
                content: 'Супер Юла',
            }
        }));

        root.querySelector('#category').replaceWith(button({
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Категории'
            }
        }));

        root.querySelector('#product-create').replaceWith(button({
            variant: 'neutral',
            subVariant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Разместить объявление'
            }
        }));

        root.querySelector('#signin')?.replaceWith(button({
            variant: 'primary',
            link: '/signin',
            text: {
                class: 'text-regular',
                content: 'Войти'
            }
        }));

        root.querySelector('#signup')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'primary',
            link: '/signup',
            text: {
                class: 'text-regular',
                content: 'Зарегистрироваться'
            }
        }));

        root.querySelector('#profileBtn')?.replaceWith(profileBtn.render());

        root.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )
        
        const wrapper = document.createElement('div');
        wrapper.classList.toggle('wrapper');
        wrapper.appendChild(root);

        return wrapper;
    }
}
