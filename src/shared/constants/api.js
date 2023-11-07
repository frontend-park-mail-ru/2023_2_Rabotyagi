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
        ADD: 'order/add',
        BUY_FULL_BASKET: 'order/buy_full_basket',
        GET_BASKET: 'order/get_basket',
        UPDATE_COUNT: 'order/update_count',
        UPDATE_STATUS: 'order/update_status',
        DELETE: 'order/delete/'
    },
    PROFILE: {
        GET: 'profile/get/',
    },
    PRODUCT: {
        LIST: 'product/get_list',
        GET: 'product/get/'
    }
};
