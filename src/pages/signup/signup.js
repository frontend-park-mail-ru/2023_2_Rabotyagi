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
                console.log
                throw body.error;
            }
            const cookies = cookieParser(document.cookie);
            store.user.login(cookies);
            window.Router.navigateTo('/');
        } catch (err) {
            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(err));
        }
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
        const errorBox = container.querySelector('#errorBox');

        const btnSubmit = button({
            variant: 'primary',
            style: 'width: 100%',
            text: {
                content: 'Продолжить',
                class: 'text-regular'
            }
        });

        btnSubmit.addEventListener('click', (e) => {
            e.stopPropagation();
            const inputEmail = container.querySelector('#inputEmail');
            const inputPass = container.querySelector('#inputPass');
            const inputPassRepeat = container.querySelector('#inputPassRepeat');

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

            this.signup(inputEmail.value, inputPass.value, errorBox);
        });

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


        return root;
    }
}
