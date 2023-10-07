/**
 * @file router.mjs
 * @module Router
 */

/**
 * @constant {Dict} router Хранилище страниц и callback функций для отрисовки
 * @property {Dict} pages Стейт страниц приложения
 * @property {string} activePage Стейт активной страницы
 */
export const router = { /**
     * @default 'main'
     */
    activePage: 'main',
    init: (pages) => {
        Object.entries(pages).map(([name, callback]) => {
            console.log(name, callback)
            router.pages[name] = callback
        })
    },
    redirect: (name) => {
        router.pages[name]()
    },
    pages: {}
}
