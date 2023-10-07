/**
 * @module signupPage
 * @file signupPage.mjs
 */

import {store} from "../store.mjs"
import API from "../../api/api.mjs"
import {validateEmail, validatePassword} from "../../modules/validation.mjs";


/**
 * @async
 * @summary Функция регистрации
 * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
 * @borrows store
 * @param {string} email Почта юзера
 * @param {string} password Пароль юзера
 */
async function signup(email, password) {
    let credentials = {
        'email': email,
        'password': password
    }

    Ajax.post({
        url: API.ADRESS_BACKEND + API.SIGNUP,
        body: JSON.stringify(credentials)
    }).then(data => {
        if (data.status == 200) {
            store.user.login(email)
            store.activePage = 'main'
            store.pages.redirect('main')
        } else {
            alert(data.body.error)
        }
    })
}

export class SignupPage {
    constructor() {}

    /**
     * #check() validate email, password and repeated password
     * @param {string} email - email
     * @param {string} pass - password
     * @param {string} repeatPass - repeated password
     * @return {null|string} return null if validation ok and return string if not
     */
    #check(email, pass, repeatPass) {
        email = email.trim()
        pass = pass.trim()
        repeatPass = repeatPass.trim()

        const errEmail = validateEmail(email)
        if (errEmail) {
            return errEmail
        }

        const errPassword = validatePassword(pass)
        if (errPassword) {
            return errPassword
        }

        if (pass !== repeatPass) {
            return 'Пароли не совпадают'
        }

        return null
    }

    /**
     * @summary Рендер функция
     * @returns {HTMLElement}
     */
    render() {
        const root = document.createElement('div')
        const content = document.createElement('div')
        const info = document.createElement('div')

        root.classList = ['signinPage']
        content.classList = ['signinPage-content']
        info.classList = ['signinPage-info']

        const logoBtn = document.createElement('button')
        const emailInput = document.createElement('input')
        const passInput = document.createElement('input')
        const repeatPassInput = document.createElement('input')
        const submitBtn = document.createElement('button')
        const toRegBtn = document.createElement('button')

        logoBtn.textContent = '(Главная) Тут должно быть лого, но пока его нет((('
        emailInput.placeholder = 'Электронная почта'
        passInput.placeholder = 'Пароль'
        repeatPassInput.placeholder = 'Повтор пароля'
        submitBtn.textContent = 'Подтвердить'

        logoBtn.classList = ['btn-neutral']
        submitBtn.classList = ['btn-neutral']
        toRegBtn.classList = ['btn-neutral']
        emailInput.classList = ['inputField']
        passInput.classList = ['inputField']
        passInput.type = ['password']
        repeatPassInput.classList = ['inputField']
        repeatPassInput.type = ['password']

        logoBtn.addEventListener('click', (e) => {
            store.pages['main']()
        })

        submitBtn.addEventListener('click', (e) => {
            const error = this.#check(emailInput.value, passInput.value, repeatPassInput.value)

            if (error) {
                alert(error);
                return;
            }

            signup(emailInput.value, passInput.value, repeatPassInput.value)
        })

        content.appendChild(logoBtn)
        content.appendChild(emailInput)
        content.appendChild(passInput)
        content.appendChild(repeatPassInput)
        content.appendChild(submitBtn)

        root.appendChild(content)
        root.appendChild(info)

        return root
    }
}
