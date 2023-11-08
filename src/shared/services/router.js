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
    constructor(path, component, routes = null) {
        this.path = path;
        this.component = component;
        this.routes = routes;
    }
}

/**
 * @class
 * @summary Класс роутера
 */
export class Router {
    // /**
    //  * @constructor
    //  * @param {Array} routes маршруты
    //  */
    constructor(routes, container) {
        this.container = container;
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
    }

    addRoutes(routes) {
        this.routes = routes;
        this.init();
        this.loadRoute();
    }

    /**
     * @method
     * @summary метод для изменения истории
     * @param {string} url
     */
    navigateTo(url, state) {
        history.pushState(state, null, url);
        this.loadRoute();
    }

    /**
     * @method
     * @summary рендерит страницу согласно маршруту
     */
    async loadRoute() {
        const route = this.routes.find((r) => r.path.exec(location.pathname));

        this.container.innerHTML = '';

        const component = route?.component.render();
        
        if (component !== undefined){
            this.container.append(...component);
        }

    }
}