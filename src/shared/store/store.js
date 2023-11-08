/**
 * @file store.mjs
 * @module Store
 */
import user from './user.js';
import cart from './cart.js';
/**
 * @constant {Dict} store Хранилище стейта всего приложения
 */
export const store = {
    user: user,
    cart: cart,
};
