/**
 * @file store.mjs
 * @module Store
 */
import user from './user.js';
import cart from './cart.js';
import { categories } from './categories.js';
/**
 * @constant {Dict} store Хранилище стейта всего приложения
 */
export const store = {
    init: async () => {
        store.user.init();
        store.cart.init();
        await store.categories.init();
    },
    user: user,
    cart: cart,
    categories: categories,
};
