/**
 * @module signupPage
 * @file signupPage.mjs
 */

import {store} from "../shared/constants/store.mjs";
import {validateEmail, validatePassword} from "../shared/utils/Validation.mjs";
import {Auth} from "../shared/api/auth.mjs";
import {ErrorMessageBox} from "../components/error/ErrorMessageBox.mjs";

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
        const root = document.createElement('div');
        const content = document.createElement('div');
        const info = document.createElement('div');

        root.classList = ['signinPage'];
        content.classList = ['signinPage-content'];
        info.classList = ['signinPage-info'];

        const logoBtn = document.createElement('a');
        const emailInput = document.createElement('input');
        const passInput = document.createElement('input');
        const repeatPassInput = document.createElement('input');
        const errorBox = document.createElement('div');
        const submitBtn = document.createElement('button');

        logoBtn.textContent = '(Главная) Тут должно быть лого, но пока его нет(((';
        emailInput.placeholder = 'Электронная почта';
        passInput.placeholder = 'Пароль';
        repeatPassInput.placeholder = 'Повтор пароля';
        submitBtn.textContent = 'Подтвердить';

        logoBtn.classList = ['btn-neutral'];
        logoBtn.dataset.link = '/';
        logoBtn.href = '/';
        submitBtn.classList = ['btn-neutral'];
        emailInput.classList = ['inputField'];
        passInput.classList = ['inputField'];
        passInput.type = ['password'];
        repeatPassInput.classList = ['inputField'];
        repeatPassInput.type = ['password'];


        content.appendChild(logoBtn);
        content.appendChild(emailInput);
        content.appendChild(passInput);
        content.appendChild(repeatPassInput);
        content.appendChild(errorBox);
        content.appendChild(submitBtn);

        root.appendChild(content);
        root.appendChild(info);

        document.title = 'Регистрация';

        submitBtn.addEventListener('click', (e) => {
            const error = this.#check(emailInput.value, passInput.value, repeatPassInput.value);

            if (error) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(error));
                return;
            }

            Auth.signup(emailInput.value, passInput.value).then(resp => {
                store.user.login(emailInput.value);
                Router.navigateTo('/');
            }).catch(err => {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(err));
            })
        })

        return root;
    }
}
