/**
 * @module signinPage
 * @file signin.mjs
 */

import { store } from '../../shared/store/store.mjs';
import { cookieParser } from '../../shared/utils/cookie.mjs';
import {
    validateEmail,
    validatePassword,
} from '../../shared/utils/validation.mjs';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.mjs';
import { Auth } from '../../shared/api/auth.mjs';
import { stringToElement } from '../../shared/utils/parsing.mjs';

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

    /**
     * @method
     * @summary Функция рендера страницы-блока авторизации
     * @description Формирует страницу с элементами \
     * Навешивает обработчики событий на элементы
     * @returns {HTMLElement}
     */
    render() {
        const template = Handlebars.templates['signin.hbs'];

        const context = {
            buttons: {
                submit: 'Продолжить',
                toReg: 'Регистрация',
            },
        };

        const root = stringToElement(template(context));
        document.title = 'Вход';

        const container = root.querySelector('div.right-block-content');
        const inputEmail = container.querySelector('#inputEmail');
        const inputPass = container.querySelector('#inputPass');
        const errorBox = container.querySelector('#errorBox');

        container.querySelector('#btnSubmit').addEventListener('click', (e) => {
            const error = this.#check(inputEmail.value, inputPass.value);

            if (error) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(error));
                return;
            }

            (async function () {
                try {
                    const resp = await Auth.signin(
                        inputEmail.value,
                        inputPass.value
                    );
                    if (resp.status != 200) {
                        throw resp.body.error;
                    } else {
                        const cookies = cookieParser(document.cookie);
                        store.user.setAccessToken(cookies);
                        Router.navigateTo('/');
                    }
                } catch (err) {
                    errorBox.innerHTML = '';
                    errorBox.appendChild(ErrorMessageBox(err));
                }
            })();
        });

        return root;
    }
}
