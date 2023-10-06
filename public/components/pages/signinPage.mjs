/**
 * @module Страница_авторизации
 */

import { store } from "../store.mjs"
import API from "../../api/api.mjs"

/**
 * @async
 * @summary Функция авторизации
 * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
 * @borrows store
 * @param {string} email Почта юзера
 * @param {string} password Пароль юзера
 */
async function signin(email, password) {
    let cridentials = {
        email: email,
        password: password
    }
    Ajax.postUsingFetch({
        url: API.ADRESS_BACKEND + API.SIGNIN,
        body: JSON.stringify(cridentials),
        callback: (response) => {
            if (response.status == 200) {
                store.user.login(email)
                store.pages.redirect('main')
            }
            else {
                alert(response.Body.error)
            }
        }
    })
}


/**
 * @class SigninPage
 * @summary Класс страницы авторизации
 */
export class SigninPage {
    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @method render
     * @summary Функция рендера страницы-блока авторизации
     * @description Формирует страницу с элементами \
     * Навешивает обработчики событий на элементы
     * @returns {HTMLElement}
     */
    render(){
        const root = document.createElement('div')
        const content = document.createElement('div')
        const info = document.createElement('div')

        root.classList = ['signinPage']
        content.classList = ['signinPage-content']
        info.classList = ['signinPage-info']

        const logoBtn = document.createElement('button')
        const emailInput = document.createElement('input')
        const passInput = document.createElement('input')
        const submitBtn = document.createElement('button')
        const toRegBtn = document.createElement('button')

        logoBtn.textContent = '(Главная) Тут должно быть лого, но пока его нет((('
        emailInput.placeholder = 'Электронная почта'
        passInput.placeholder = 'Пароль'
        submitBtn.textContent = 'Подтвердить'
        toRegBtn.textContent = 'Зарегистрироваться'

        logoBtn.classList = ['btn-neutral']
        submitBtn.classList = ['btn-neutral']
        toRegBtn.classList = ['btn-neutral']
        emailInput.classList = ['inputField']
        passInput.classList = ['inputField']

        logoBtn.addEventListener('click', (e) => {
            store.pages['main']()
        })

        submitBtn.addEventListener('click', (e) => {
            signin(emailInput.value, passInput.value)
        })
        toRegBtn.addEventListener('click', (e) => {
            store.pages['signup']()
        })

        content.appendChild(logoBtn)
        content.appendChild(emailInput)
        content.appendChild(passInput)
        content.appendChild(submitBtn)
        content.appendChild(toRegBtn)

        root.appendChild(content)
        root.appendChild(info)

        return root
    }
}