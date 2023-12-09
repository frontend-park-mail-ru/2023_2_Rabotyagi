import { deleteCookie } from '../utils/cookie';
import jwtDecode from '../utils/jwt-decode';

import { ResponseStatus, ResponseStatusChecker } from '../constants/response';
import { Store } from '../services/store/Store';
import { UserApi } from '../api/user';
import { UserModel } from '../models/user';

export enum UserStoreAction {
    UPDATE = 'USER_STORE_UPDATE',
    REFRESH = 'USER_STORE_REFRESH',
    LOGOUT = 'USER_STORE_LOGOUT'
}

interface StoreUserState {
    fields: UserModel | null,
    accessToken: string | null,
}

const initState: StoreUserState = {
    fields: null,
    accessToken: null,
};

class UserStore extends Store<StoreUserState> {
    public getFields = (): UserModel | null => this.state.fields;

    private update(data: object): void {
        if (data) {
            this.state.fields = {
                ...this.state.fields,
                ...data,
            } as UserModel;
        }
    }

    private logout() {
        deleteCookie('access_token');
        this.state.fields = null;
        this.state.accessToken = null;
    }

    // clear() {
    //     this.state.fields = null;
    //     this.state.accessToken = null;
    // }

    isAuth() {
         return this.state.fields !== null ? true : false;
    }

    private refresh = async() => {
        if (!this.state.fields?.id) {
            throw new Error('UserStore: id is undefined or null');
        }

        let res;
        try {
            res = await UserApi.getProfile(this.state.fields.id);
        }
        catch(err) {
            console.error(err);
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
            console.error(new Error(res.body.error));
        }

        this.state.fields = res.body as UserModel;
    };

    isSameUser = (id: number): boolean => this.state.fields?.id === id;

    private async login(accessToken: string | undefined) {

        this.logout();

        if (accessToken === undefined) {
            return;
        }

        await this.fill(accessToken);
    }

    private async fill(accessToken: string) {
        const id = jwtDecode(accessToken).userID;

        if (id) {
            const res = await UserApi.getProfile(id);
            switch (res.status){
                case ResponseStatus.RESPONSE_SUCCESSFUL:
                    this.update(res.body);
                    break;
                case ResponseStatus.INTERNAL_SERVER:
                    deleteCookie('access_token');
                    break;
            }
        }
    }

    public addActions(): void {
        this.addAction({
            name: UserStoreAction.UPDATE,
            operation: (payload) => this.update(payload),
        });
        this.addAction({
            name: UserStoreAction.REFRESH,
            operation: () => this.refresh(),
        });
        this.addAction({
            name: UserStoreAction.LOGOUT,
            operation: () => this.logout(),
        });
    }
}

export default new UserStore(initState);
