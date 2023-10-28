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
    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute();
    }

    /**
     * @method
     * @summary рендерит страницу согласно маршруту
     */
    async loadRoute() {
        
        // const nodes = location.pathname.split('/').filter((value) => value != '' || undefined);

        // let node = this;
        // nodes.forEach((path) => {
        //     node = node.routes;
        //     const res = node.find((r) => r.path === '/'+path);
        //     console.log(res);
        //     node = res;
        // });
        const route = this.routes.find((r) => r.path.exec(location.pathname));

        this.container.innerHTML = '';

        try {
            this.container.appendChild(route.component.render());
        }
        catch (err) {
            // console.log(route, this.routes, location.pathname);
        }

    }
}

// const routes = {
//     '/': {
//         parent: null,
//     },
//     '/profile': {
//         parent: null,
//         routes: {
//             '/products': {},
//             '/orders': {}
//         }
//     },
//     '/signin': {
//         parent: null,
//     },
//     '/signup' : {
//         parent: null,
//     },
// }