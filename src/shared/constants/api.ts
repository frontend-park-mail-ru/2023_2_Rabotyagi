export enum UserRoutes {
    GET_LIST_OF_USER = 'product/get_list_of_saler',
    GET_LIST_OF_SALER = 'product/get_list_of_another_saler',
    PROFILE_GET = 'profile/get',
    PROFILE_PUT = 'profile/update',
    PROFILE_PATCH = PROFILE_PUT,
    PROFILE_FAVS = 'profile/favourites',
    ADD_TO_FAV = 'product/add-to-fav',
    REMOVE_FROM_FAV = 'product/remove-from-fav',
    ORDERS_GET = 'profile/orders',
}

export enum AuthRoutes {
    SIGNUP = 'signup',
    SIGNIN = 'signin',
}

export enum CategoryRoutes {
    GET = 'category/get_full',
}

export enum CityRoutes {
    GET = 'city/get_full',
}

export enum FilesRoutes {
    IMAGES = 'img/upload',
}

export enum OrderRoutes {
    ADD = 'order/add',
    BUY_FULL_BASKET = 'order/buy_full_basket',
    GET_BASKET = 'order/get_basket',
    UPDATE_COUNT = 'order/update_count',
    UPDATE_STATUS = 'order/update_status',
    SOLD = 'order/sold',
    STATUS_NOT_IN_BASKET = 'order/get_not_in_basket',
    DELETE = 'order/delete',
}

export enum CommentRoutes {
    ADD = 'comment/add',
    DELETE = 'comment/delete',
    GET_LIST = 'comment/get_list',
    UPDATE = 'comment/update',
}

export enum ProductRoutes {
    LIST = 'product/get_list',
    GET = 'product/get',
    POST = 'product/add',
    DELETE = 'product/delete',
    PATCH = 'product/update',
    PUT = PATCH,
    ACTIVATE = 'product/activate',
    DEACTIVATE = 'product/close',
    SEARCH = 'product/search',
    SEARCH_FEED = 'product/get_search_feed',
}

export enum PremiumRoutes {
    ADD = 'premium/add',
    GET_STATUS = 'premium/check'
}
