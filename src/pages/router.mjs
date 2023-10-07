/**
 * @file router.mjs
 * @module Router
 */

/**
 * @constant {Dict} router Хранилище страниц и callback функций для отрисовки
 * @property {Dict} pages Стейт страниц приложения
 * @property {string} activePage Стейт активной страницы
 */
// export const router = { /**
//      * @default 'main'
//      */
//     activePage: 'main',
//     init: (pages) => {
//         router.pages = pages;
//         router.pages.main();
//     },
//     redirect: (name) => {
//         router.pages[name]();
//     },
//     pages: {}
// }

export class Route {
    constructor(path, callback) {
        this.path = path;
        this.callback = callback;
    }
}

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
        this.navigateTo('/');
    }

    init() {
        window.addEventListener('popstate', () => this.loadRoute());
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute();
    }

    async loadRoute() {
        const route = this.routes.find(r => r.path === location.pathname) || this.routes.find(r => r.path === '*');
        await route.callback.render();
    }
}
