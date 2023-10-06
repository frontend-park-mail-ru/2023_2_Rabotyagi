'use strict'

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
            profileConf: {
                dropdownConf: {
                    id: 'profile-dropdown',
                    search: false,
                    items: {
                        ref: 'profileBtn',
                        content: [
                            ['dropdown-btn-fav', 'Избранное'],
                            ['dropdown-btn-profile', 'Профиль'],
                            ['dropdown-btn-logout', 'Выйти']
                        ]
                    },
                },
            }
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

        document.querySelector('.profile-container')?.addEventListener('click', (e) => {
            e.stopPropagation()
            document.querySelector('#profile-dropdown')?.classList.toggle('hidden')
        })

        document.querySelector('#dropdown-btn-logout')?.addEventListener('click', (e) => {
            e.stopPropagation()
            store.user.logout()
            store.activePage = 'signin'
            store.pages.redirect('signin')
        })
    }
}
