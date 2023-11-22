/**
 * @module signinPage
 * @file signin.js
 */

import { store } from '../../shared/store/store.js';
import { cookieParser } from '../../shared/utils/cookie.js';
import Validate from '../../shared/utils/validation.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { Auth } from '../../shared/api/auth.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './signin.hbs';
import './signin.scss';
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import logo from '../../assets/icons/logo.svg';
import { Order } from '../../shared/api/order.js';

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
        const errEmail = Validate.email(email);
        if (errEmail) {
            return errEmail;
        }

        const errPassword = Validate.password(pass);
        if (errPassword) {
            return errPassword;
        }

        return null;
    }

    async signin(email, pass, errorBox) {
        try {
            const resp = await Auth.signin(email, pass);
            const body = resp.body;

            if (resp.status != 200) {
                throw new Error(body.error);
            }
            const accessToken = cookieParser(document.cookie).access_token;
            await store.user.login(accessToken);
            store.cart.clear();

            const respCart = await Order.getCart();
            const bodyCart = respCart.body;

            if (respCart.status != 200) {
                throw bodyCart.error;
            }

            return true;
        } catch (err) {
            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(err));

            return false;
        }
    }

    signinEvent(container){
        const handler = async(e) => {
            if ((e.type === 'click') || (e.type === 'keydown' && e.code === 'Enter')) {
                const inputEmail = container.querySelector('#inputEmail');
                const inputPass = container.querySelector('#inputPass');
                const errorBox = container.querySelector('#errorBox');

                if (!inputEmail || !inputPass) {
                    // console.log('signin | не найдены инпуты, что-то пошло не так');
                    return;
                }

                const error = this.#check(inputEmail.value, inputPass.value);

                if (error) {
                    errorBox.innerHTML = '';
                    errorBox.appendChild(ErrorMessageBox(error));

                    return;
                }

                const res = await this.signin(inputEmail.value, inputPass.value, errorBox);

                if (res){
                    document.body.removeEventListener('keydown', handler);
                    window.Router.navigateTo('/');
                }
            }
        };

        return handler;
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
            style: 'height: auto; padding: 0;',
        }));

        const btnSubmit = button({
            variant: 'primary',
            style: 'width: 100%',
            text: {
                content: 'Продолжить',
                class: 'text-regular',
            },
        });

        const btnReg = button({
            link: '/signup',
            variant: 'neutral',
            style: 'width: 100%',
            subVariant: 'primary',
            text: {
                content: 'Регистрация',
                class: 'text-regular',
            },
        });

        container.querySelector('#btnSubmit').replaceWith(btnSubmit);
        container.querySelector('#signup').replaceWith(btnReg);

        container.querySelectorAll('button[data-link]').forEach(item =>
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false }),
        );

        btnSubmit.addEventListener('click', this.signinEvent(container));
        document.body.addEventListener('keydown', this.signinEvent(container));

        return [ root ];
    }
}
