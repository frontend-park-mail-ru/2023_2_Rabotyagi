/**
 * @module signupPage
 * @file signupPage.mjs
 */

import { store } from '../../shared/store/store.mjs';
import { cookieParser } from '../../shared/utils/cookie.mjs';
import {
    validateEmail,
    validatePassword,
} from '../../shared/utils/validation.mjs';
import { Auth } from '../../shared/api/auth.mjs';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.mjs';
import { stringToElement } from '../../shared/utils/parsing.mjs';

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

    /**
     * @summary Рендер функция
     * @returns {HTMLElement}
     */
    render() {
        const template = Handlebars.templates['signup.hbs'];

        const context = {
            buttons: {
                submit: 'Продолжить',
            },
        };

        const root = stringToElement(template(context));
        document.title = 'Регистрация';

        const container = root.querySelector('#content');
        const errorBox = container.querySelector('#errorBox');

        container.querySelector('#btnSubmit').addEventListener('click', (e) => {
            e.stopPropagation();
            const inputEmail = container.querySelector('#inputEmail');
            const inputPass = container.querySelector('#inputPass');
            const inputPassRepeat = container.querySelector('#inputPassRepeat');

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

            (async function () {
                try {
                    let resp = await Auth.signup(
                        inputEmail.value,
                        inputPass.value
                    );
                    if (resp.status != 200) {
                        throw resp.body.error;
                    } else {
                        let cookies = cookieParser(document.cookie);
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
