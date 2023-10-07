/**
 * @module signinPage
 * @file signin.mjs
 */

import {store} from "../shared/constants/store.mjs";
import {validateEmail, validatePassword} from "../shared/utils/Validation.mjs";
import {ErrorMessageBox} from "../components/error/ErrorMessageBox.mjs";
import {Auth} from "../shared/api/auth.mjs";


/**
 * @class signinPage
 * @summary Класс страницы авторизации
 */
export class SigninPage { /**
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
        const root = document.createElement('div');
        const content = document.createElement('div');
        const info = document.createElement('div');

        root.classList = ['signinPage'];
        content.classList = ['signinPage-content'];
        info.classList = ['signinPage-info'];

        const logoBtn = document.createElement('a');
        const emailInput = document.createElement('input');
        const passInput = document.createElement('input');
        const errorBox = document.createElement('div');
        const submitBtn = document.createElement('button');
        const toRegBtn = document.createElement('a');

        logoBtn.textContent = '(Главная) Тут должно быть лого, но пока его нет(((';
        emailInput.placeholder = 'Электронная почта';
        passInput.placeholder = 'Пароль';
        submitBtn.textContent = 'Подтвердить';
        toRegBtn.textContent = 'Зарегистрироваться';

        logoBtn.classList = ['btn-neutral'];
        logoBtn.dataset.link = '/';
        logoBtn.href = '/';
        submitBtn.classList = ['btn-neutral'];
        toRegBtn.classList = ['btn-neutral'];
        toRegBtn.dataset.link = '/signup';
        toRegBtn.href = '/signup';
        emailInput.classList = ['inputField'];
        passInput.classList = ['inputField'];
        passInput.type = ['password'];


        content.appendChild(logoBtn);
        content.appendChild(emailInput);
        content.appendChild(passInput);
        content.appendChild(errorBox);
        content.appendChild(submitBtn);
        content.appendChild(toRegBtn);

        root.appendChild(content);
        root.appendChild(info);

        document.title = 'Вход';

        submitBtn.addEventListener('click', (e) => {
            const error = this.#check(emailInput.value, passInput.value);

            if (error) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(error));
                return;
            }

            Auth.signin(emailInput.value, passInput.value).then(resp => {
                store.user.login(emailInput.value);
                Router.navigateTo('/');
            }).catch(err => {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(err));
            });
        })

        return root;
    }
}
