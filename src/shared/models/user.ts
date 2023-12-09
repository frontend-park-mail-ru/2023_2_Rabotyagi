export interface UserModel {
    id: number,
    avatar: string | null,
    birthday: string,
    created_at: string,
    email: string,
    name: string | null,
    phone: string | null
}

export type UserModelPatch = {
    avatar?: string,
    email?: string,
    name?: string,
    phone?: string
}
