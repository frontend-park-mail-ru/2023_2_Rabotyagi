declare interface UserModel {
    id: number,
    avatar: string | null,
    birthday: string,
    created_at: string,
    email: string,
    name: string | null,
    phone: string | null
}

declare type UserModelPatch = {
    avatar?: string,
    email?: string,
    name?: string,
    phone?: string
}

declare interface productImageUrl {
    url: string
}

declare interface productPriceUnit {
    created_at: string,
    price: number,
}

declare interface ProductModel {
    title?: string,
    description?: string,
    available_count?: number,
    category_id?: number,
    city_id?: number,
    delivery?: boolean,
    images?: Array<productImageUrl>,
    is_active?: boolean,
    price?: number,
    safe_deal?: boolean,
    saler_id?: number,
}

declare interface ProductModelPut {
    title: string,
    description: string,
    available_count: number,
    category_id: number,
    city_id: number,
    delivery: boolean,
    images: Array<productImageUrl>,
    is_active: boolean,
    price: number,
    safe_deal: boolean,
    saler_id: number,
}

declare interface ProductModelResponse extends ProductModelPut {
    id: number,
    created_at: string,
    favourites: number,
    in_favourites: boolean,
    views: number,
    premium: boolean,
    price_history?: Array<productPriceUnit> | null,

}

declare interface FavouriteModel {
    id: number
}

declare interface CityModel {
    id: number,
    name: string,
}

declare interface CategoryModel {
    id: number,
    name: string,
    parent_id: number | null
}

declare interface OrderModel {
    id: number,
    owner_id: number,
    saler_id: number,
    city_id: number,
    product_id: number,
    title: string,
    count: number,
    price: number,
    available_count: number,
    images: Array<{ url: string }> | null | undefined,
    delivery: boolean,
    safe_deal: boolean,
    in_favourites: boolean,
    status?: number,
}

declare interface SalerModel {
    id: number,
    name: string,
    email: string,
    avatar: string,
}
