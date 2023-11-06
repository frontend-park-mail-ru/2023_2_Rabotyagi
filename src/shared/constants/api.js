export const API = {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    POST: {
        BASE: 'post',
        LIST: 'post/get_list',
    },
    USER: {
        PRODUCTS: 'user/products',
        PROFILE: 'user/profile',
        ORDERS: 'user/orders'
    },
    ORDER: {
        ADD: 'orders/add',
        BUY_FULL_BASKET: 'order/buy_full_basket',
        GET_BASKET: 'order/get_basket',
        UPDATE_COUNT: 'order/update_count',
        UPDATE_STATUS: 'order/update_status',
    },
    PROFILE: {
        GET: 'profile/get/',
    }
};
