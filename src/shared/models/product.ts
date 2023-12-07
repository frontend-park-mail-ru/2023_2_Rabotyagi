export interface productImageUrl {
    url: string
}

export interface ProductModel {
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

export interface ProductModelPut {
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

export interface ProductModelResponse extends ProductModelPut {
    id: number,
    created_at: string,
    favourites: number,
    in_favourites: boolean,
    views: number
}
