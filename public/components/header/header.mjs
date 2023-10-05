'use strict'

import { Profile } from "../profileBtn/profileBtn.mjs"
import { AuthBox } from "../authBox.mjs"
import { store } from "../store.mjs"
import logo from "../icons/logo.mjs"
import search from "../icons/search.mjs"
    
    // Не-дефолтный экспорт
export class Header {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render() {
        const template = Handlebars.templates['header.hbs']
        Handlebars.registerPartial('profile', Handlebars.templates['profileBtn.hbs'])
        Handlebars.registerPartial('dropdown', Handlebars.templates['dropdown.hbs'])
        // const profile = new Profile(this)

        const context = {
            logo: {
                icon: logo()
            },
            search: {
                icon: search()
            },
            signin: {
                caption: 'Войти',
            },
            signup: {
                caption: 'Зарегистрироваться',
            },
            authorized: store.authorized,
        }


        this.#parent.innerHTML = this.#parent.innerHTML + template(context)

        document.querySelector('#btn-signin')?.addEventListener('click', (e) => {
            e.stopPropagation()
            store.activePage = 'signin'
            store.pages['signin']()
        })

        document.querySelector('#btn-signup')?.addEventListener('click', (e) => {
            e.stopPropagation()
            store.activePage = 'signup'
            store.pages['signup']()
        })


    }
}
