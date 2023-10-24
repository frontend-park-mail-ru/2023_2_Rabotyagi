/**
 * @file router.mjs
 * @module Router
 */
/**
 * @class
 * @summary Класс роутера
 */
export class Router {
    // /**
    //  * @constructor
    //  * @param {Array} routes маршруты
    //  */
    // constructor(routes) {
    //     this.routes = routes;
    //     this.init();
    //     this.loadRoute();
    // }

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
        try {
            root.appendChild(route.component.render());
        }
        catch {
            root.append(...route.component.render())
        }
    }
}

export default new Router();