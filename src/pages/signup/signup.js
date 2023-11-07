/**
 * @module signupPage
 * @file signupPage.js
 */

import { store } from '../../shared/store/store.js';
import { cookieParser } from '../../shared/utils/cookie.js';
import {
    validateEmail,
    validatePassword,
} from '../../shared/utils/validation.js';
import { Auth } from '../../shared/api/auth.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './signup.hbs'
import styles from './signup.scss' // eslint-disable-line no-unused-vars
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import logo from '../../assets/icons/logo.svg'

export class SignupPage {
    /**
     * #check() validate email, password and repeated password
     * @param {string} email - email
     * @param {string} pass - password
     * @param {string} repeatPass - repeated password
     * @return {null|string} return null if validation ok and return string if not
     */
    #check(email, pass, repeatPass) {
        email = email.trim();
        pass = pass.trim();
        repeatPass = repeatPass.trim();

        const errEmail = validateEmail(email);
        if (errEmail) {
            return errEmail;
        }

        const errPassword = validatePassword(pass);
        if (errPassword) {
            return errPassword;
        }

        if (pass !== repeatPass) {
            return 'Пароли не совпадают';
        }

        return null;
    }

    async signup(email, pass, errorBox) {
        try {
            const resp = await Auth.signup(email, pass);
            const body = await resp.json();
            if (resp.status != 200) {
                throw new Error(body.error);
            }
            const cookies = cookieParser(document.cookie);
            store.user.login(cookies);
            store.cart.clear();
            window.Router.navigateTo('/');
            return true;
        } catch (err) {
            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(err));
            return false;
        }
    }

    signupEvent(container) {
        var handler = async (e) => {
            if ((e.type === 'click') || (e.type === 'keydown' && e.code === 'Enter')) {
                const inputEmail = container.querySelector('#inputEmail');
                const inputPass = container.querySelector('#inputPass');
                const inputPassRepeat = container.querySelector('#inputPassRepeat');
                const errorBox = container.querySelector('#errorBox');
    
                if (!inputEmail || !inputPass || !inputPassRepeat) {
                    console.log('signup | не найдены инпуты, что-то пошло не так');
                    return;
                }
    
                const error = this.#check(
                    inputEmail.value,
                    inputPass.value,
                    inputPassRepeat.value
                );
    
                if (error) {
                    errorBox.innerHTML = '';
                    errorBox.appendChild(ErrorMessageBox(error));
                    return;
                }
    
                const res = await this.signup(inputEmail.value, inputPass.value, errorBox);
                if (res) {
                    document.body.removeEventListener('keydown', handler);
                }
            }
        }

        return handler;
    }

    /**
     * @summary Рендер функция
     * @returns {HTMLElement}
     */
    render() {
        const template = Template;

        const context = {
            buttons: {
                submit: 'Продолжить',
            },
        };

        const root = stringToElement(template(context));
        document.title = 'Регистрация';

        const container = root.querySelector('#content');

        const btnSubmit = button({
            variant: 'primary',
            style: 'width: 100%',
            text: {
                content: 'Продолжить',
                class: 'text-regular'
            }
        });

        btnSubmit.addEventListener('click', this.signupEvent(container));
        document.body.addEventListener('keydown', this.signupEvent(container));

        container.querySelector('#btnSubmit').replaceWith(btnSubmit);

        container.querySelector('#logo-btn').replaceWith(button({
            leftIcon: svg({ content: logo }),
            link: '/',
            variant: 'neutral',
            subVariant: 'outlined',
            style: 'height: auto; padding: 0;'
        }));

        container.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false })
        )


        return [ root ];
    }
}
