export const API = {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    POST: {
        LIST: 'post/get_list',
    },
    USER: {
        PRODUCTS: 'user/products',
        PROFILE: 'user/profile',
        ORDERS: 'user/orders'
    },
    ORDER: {
        BASE: 'orders',
        GET_CART: 'orders?status=0',
    },
};
