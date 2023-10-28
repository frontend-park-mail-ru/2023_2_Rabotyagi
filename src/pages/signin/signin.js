/**
 * @module signinPage
 * @file signin.js
 */

import { store } from '../../shared/store/store.js';
import { cookieParser } from '../../shared/utils/cookie.js';
import {
    validateEmail,
    validatePassword,
} from '../../shared/utils/validation.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { Auth } from '../../shared/api/auth.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './signin.hbs';
import css from './signin.scss' // eslint-disable-line no-unused-vars
import Router from '../../shared/services/router.js';
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import logo from '../../assets/icons/logo.svg'

/**
 * @class signinPage
 * @summary Класс страницы авторизации
 */
export class SigninPage {
    /**
     * #check() validate email, password and repeated password
     * @param {string} email - Почта юзера
     * @param {string} pass - Пароль юзера
     * @return {null|string} return null if validation ok and return string if not
     */
    #check(email, pass) {
        email = email.trim();
        pass = pass.trim();

        const errEmail = validateEmail(email);
        if (errEmail) {
            return errEmail;
        }

        const errPassword = validatePassword(pass);
        if (errPassword) {
            return errPassword;
        }

        return null;
    }

    async signin(email, pass, errorBox) {
        try {
            const resp = await Auth.signin(email, pass);
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            const cookies = cookieParser(document.cookie);
            store.user.login(cookies);
            Router.navigateTo('/');
        } catch (err) {
            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(err));
        }
    }

    /**
     * @method
     * @summary Функция рендера страницы-блока авторизации
     * @description Формирует страницу с элементами \
     * Навешивает обработчики событий на элементы
     * @returns {HTMLElement}
     */
    render() {
        const template = Template;

        const context = {
            buttons: {
                submit: 'Продолжить',
                toReg: 'Регистрация',
            },
        };

        const root = stringToElement(template(context));
        document.title = 'Вход';

        const container = root.querySelector('div.right-block-content');

        container.querySelector('#logo-btn').replaceWith(button({
            leftIcon: svg({ content: logo }),
            link: '/',
            variant: 'neutral',
            subVariant: 'outlined',
            style: 'height: auto; padding: 0;'
        }));

        const btnSubmit = button({
            variant: 'primary',
            style: 'width: 100%',
            text: {
                content: 'Продолжить',
                class: 'text-regular'
            }
        });

        const btnReg = button({
            link: '/signup',
            variant: 'neutral',
            style: 'width: 100%',
            subVariant: 'primary',
            text: {
                content: 'Регистрация',
                class: 'text-regular'
            }
        })

        container.querySelector('#btnSubmit').replaceWith(btnSubmit);
        container.querySelector('#signup').replaceWith(btnReg);


        container.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )

        btnSubmit.addEventListener('click', () => {
            const inputEmail = container.querySelector('#inputEmail');
            const inputPass = container.querySelector('#inputPass');
            const errorBox = container.querySelector('#errorBox');

            if (!inputEmail || !inputPass) {
                console.log('signin | не найдены инпуты, что-то пошло не так');
                return;
            }

            const error = this.#check(inputEmail.value, inputPass.value);

            if (error) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(error));
                return;
            }

            this.signin(inputEmail.value, inputPass.value, errorBox);
        });

        return root;
    }
}
