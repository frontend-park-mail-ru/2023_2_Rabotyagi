'use strict'

// Тип рендера для демонстрации
export const MENU_RENDER_TYPES = {
    DOM: 'DOM',
    STRING: 'STRING',
    TEMPLATE: 'TEMPLATE'
};
    
    // Не-дефолтный экспорт
// export class Header {
//     #parent
//     #config

//     constructor(parent, config) {
//         this.#parent = parent;
//         this.#config = config;

//         // Инициализация состояния компонента
//         this.state = {
//             activeMenu: null,
//             menuElements: {},
//         }

//     }

//     // Демонстрация работы геттера
//     get config() {
//         return this.#config;
//     }

//     // Адаптер для удобства
//     get items() {
//         return Object.entries(this.config).map(([key, { href, name }]) => ({
//             key,
//             href,
//             name
//         }));
//     }

//     // Эта функция нужна для демонстрации разных видов рендера
//     render(renderType = MENU_RENDER_TYPES.DOM) {
//         this.items.map(({key, href, name}, index) => {
//             const menuElement = document.createElement('a');
//             menuElement.href = href;
//             menuElement.textContent = name;
//             menuElement.dataset.section = key;
//             menuElement.classList.add('menu__item');

//             if (index === 0) {
//                 menuElement.classList.add('active');
//                 this.state.activeMenu = menuElement;
//             }

//             this.state.menuElements[key] = menuElement;

//             return menuElement;
//         }).forEach(element => {
//             this.#parent.appendChild(element);
//         })
//     }
// }

export const Header = (parent) => {
    const elem = document.createElement('h1');
    elem.innerHTML = 'Where Johny?';
    parent.appendChild(elem);
};

export function print() {
    console.log('header.js');
};