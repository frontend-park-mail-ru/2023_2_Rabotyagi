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
    views: number
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