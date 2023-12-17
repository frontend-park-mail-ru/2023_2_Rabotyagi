export const AUTH_API = {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
};

export const CATEGORY_API = {
    GET: 'category/get_full',
};

export const CITY_API = {
    GET: 'city/get_full',
};

export const FILES_API = {
    IMAGES: 'img/upload',
};

export const ORDER_API = {
    ADD: 'order/add',
    BUY_FULL_BASKET: 'order/buy_full_basket',
    GET_BASKET: 'order/get_basket',
    UPDATE_COUNT: 'order/update_count',
    UPDATE_STATUS: 'order/update_status',
    DELETE: 'order/delete',
};

export const PRODUCT_API = {
    LIST: 'product/get_list',
    GET: 'product/get',
    POST: 'product/add',
    DELETE: 'product/delete',
    PATCH: 'product/update',
    PUT: 'product/update',
    ACTIVATE: 'product/activate',
    DEACTIVATE: 'product/close',
    SEARCH: 'product/search',
    SEARCH_FEED: 'product/get_search_feed',
};

export const USER_API = {
    PRODUCTS: {
        SAME: 'product/get_list_of_saler',
        ANOTHER: 'product/get_list_of_another_saler',
    },
    PROFILE: {
        GET: 'profile/get',
        PUT: 'profile/update',
        PATCH: 'profile/update',
        FAVS: 'profile/favourites',
    },
    // ORDERS: 'user/orders',
    ADD_TO_FAV: 'product/add-to-fav',
    REMOVE_FROM_FAV: 'product/remove-from-fav',
};
