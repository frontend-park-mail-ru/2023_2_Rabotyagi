/**
 * @file router.mjs
 * @module Router
 */

/**
 * @constant {Dict} router Хранилище страниц и callback функций для отрисовки
 * @property {Dict} pages Стейт страниц приложения
 * @property {string} activePage Стейт активной страницы
 */
export class Route {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }
}

/**
 * @class
 * @summary Класс роутера
 */
export class Router {
    /**
     * @constructor
     * @param {Array} routes маршруты
     */
    constructor(routes) {
        this.routes = routes;
        this.init();
        this.loadRoute();
    }

    /**
     * @method
     * @summary метод инициализации роутов
     */
    init() {
        window.addEventListener('popstate', () => this.loadRoute());
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    /**
     * @method
     * @summary метод для изменения истории
     * @param {string} url
     */
    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute();
    }

    /**
     * @method
     * @summary рендерит страницу согласно маршруту
     */
    async loadRoute() {
        const root = document.querySelector('#root');
        const route =
            this.routes.find((r) => r.path === location.pathname) ||
            this.routes.find((r) => r.path === '*');
        root.innerHTML = '';
        root.appendChild(route.component.render());
    }
}
