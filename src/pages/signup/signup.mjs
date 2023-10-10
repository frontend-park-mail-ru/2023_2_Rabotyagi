/**
 * @module signupPage
 * @file signupPage.mjs
 */

import {store} from "../../shared/constants/store.mjs";
import {cookieParser} from "../../shared/utils/cookie.mjs";
import {validateEmail, validatePassword} from "../../shared/utils/validation.mjs";
import {Auth} from "../../shared/api/auth.mjs";
import {ErrorMessageBox} from "../../components/error/errorMessageBox.mjs";
import {stringToElement} from "../../shared/utils/parsing.mjs";

export class SignupPage { /**
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
            return errEmail
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
                submit: 'Продолжить'
            }
        };

        document.title = 'Регистрация';

        const root = stringToElement(template(context));
        const container = root.querySelector('#content');
        const errorBox = container.querySelector('#errorBox');

        container.querySelector('#btnSubmit').addEventListener('click', (e) => {
            const inputEmail = container.querySelector('#inputEmail');
            const inputPass = container.querySelector('#inputPass');
            const inputPassRepeat = container.querySelector('#inputPassRepeat');

            const error = this.#check(inputEmail.value, inputPass.value, inputPassRepeat.value);

            if (error) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(error));
                return;
            }

            Auth.signup(inputEmail.value, inputPass.value).then(resp => {
                console.log(resp);
                if (resp.status == 200) {
                    const cookies = cookieParser(document.cookie);
                    store.user.login(cookies);
                    Router.navigateTo('/');
                } else {
                    throw resp.body.error;
                }
            }).catch(err => {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(err));
            })
        });

        return root;
    }
}
