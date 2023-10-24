/**
 * @constant {Dict} router Хранилище страниц и callback функций для отрисовки
 * @property {Dict} pages Стейт страниц приложения
 * @property {string} activePage Стейт активной страницы
 */
class Route {
    constructor(path, component) {
        this.path = path;
        this.component = component;
    }
}

export default Route;