/**
 * @file store.mjs
 * @module Store
 */
import user from './user.js';
import cart from './cart.js';
import { categories } from './categories.js';
import { cities } from './cities.js';
/**
 * @constant {Dict} store Хранилище стейта всего приложения
 */
export const store = {
    init: async () => {
        await store.user.init();
        await store.cart.init();
        await store.categories.init();
        await store.cities.init();
    },
    user: user,
    cart: cart,
    categories: categories,
    cities: cities,
};
