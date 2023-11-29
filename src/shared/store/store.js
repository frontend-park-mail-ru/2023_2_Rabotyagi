/**
 * @file store.mjs
 * @module Store
 */
import user from './user.js';
import cart from './cart.js';
import { categories } from './categories.js';
import { cities } from './cities.js';
import { favs } from './favourite.js';
/**
 * @constant {Dict} store Хранилище стейта всего приложения
 */
export const store = {
    init: async function() {
        await this.user.init();
        await this.favs.init();
        await this.cart.init();
        await this.categories.init();
        await this.cities.init();
    },
    user: user,
    favs: favs,
    cart: cart,
    categories: categories,
    cities: cities,
};
