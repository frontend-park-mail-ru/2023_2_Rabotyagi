'use strict'

// Тип рендера для демонстрации
export const MENU_RENDER_TYPES = {
    DOM: 'DOM',
    STRING: 'STRING',
    TEMPLATE: 'TEMPLATE'
};
    
    // Не-дефолтный экспорт
export class Header {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;

        // Инициализация состояния компонента
        this.state = {
            activeMenu: null,
            menuElements: {},
        }

    }

    // Демонстрация работы геттера
    get config() {
        return this.#config;
    }

    // Адаптер для удобства
    get items() {
        return Object.entries(this.config).map(([key, { href, name }]) => ({
            key,
            href,
            name
        }));
    }

    // Эта функция нужна для демонстрации разных видов рендера
    render() {
        this.items.map(({key, href, name}, index) => {
            const headerElement = document.createElement('a');
            headerElement.href = href;
            headerElement.textContent = name;
            headerElement.dataset.section = key;
            headerElement.classList.add('menu__item');

            if (index === 0) {
                headerElement.classList.add('active');
                this.state.activeMenu = headerElement;
            }

            this.state.menuElements[key] = headerElement;

            return headerElement;
        }).forEach(element => {
            this.#parent.appendChild(element);
        })
    }
}

export function print() {
    console.log('header.js');
};