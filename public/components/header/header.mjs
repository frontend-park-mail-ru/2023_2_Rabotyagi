'use strict'

import { Profile } from "../profileBtn.mjs"
import { AuthBox } from "../authBox.mjs"
import { store } from "../store.mjs"
import logo from "../icons/logo.mjs"
import search from "../icons/search.mjs"
    
    // Не-дефолтный экспорт
export class Header {
    constructor(authed = false) {

        // Инициализация состояния компонента
        this.state = {
            activeMenu: null,
            menuElements: {},
        }

    }

    render() {
        const root = document.createElement('nav')
        const headerLogo = document.createElement('a');
        const caption = document.createElement('div')

        headerLogo.href = '/';
        headerLogo.dataset.section = 'main';
        headerLogo.classList.add('menu__item');
        headerLogo.style.cssText = `display: flex;
        align-items: center;
        gap: 4px;`
        headerLogo.appendChild(logo())
        headerLogo.appendChild(caption)

        caption.textContent = 'Юла';
        caption.style.cssText = `color: #292C2F;
        font-size: 22px;
        font-family: Nunito;
        font-weight: 700;
        line-height: 30.80px;
        word-wrap: break-word`

        const categoryBtn = document.createElement('button')
        categoryBtn.textContent = 'Категории'
        categoryBtn.classList = ['btn-primary']

        const searchFieldBox = document.createElement('div')
        const searchField = document.createElement('input')
        searchField.placeholder = 'Поиск'
        searchFieldBox.appendChild(search())
        searchFieldBox.appendChild(searchField)
        searchFieldBox.classList = ['searchField']
        searchField.classList = ['searchFieldInput']

        const postCreateBtn = document.createElement('a')
        postCreateBtn.textContent = 'Разместить объявление'
        postCreateBtn.classList = ['btn-neutral']

        postCreateBtn.addEventListener('click', e => {
            // e.stopPropagation()
            // e.preventDefault()

        })

        root.appendChild(headerLogo)
        root.appendChild(categoryBtn)
        root.appendChild(searchFieldBox)
        root.appendChild(postCreateBtn)
        
        if (store.authored) {
            const profile = new Profile()
            root.appendChild(profile.render())
        } else {
            const authBox = new AuthBox()
            root.appendChild(authBox.render())
        }

        return root
    }
}
