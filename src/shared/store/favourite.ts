import { UserApi } from '../api/user';
import { FavouriteModel } from '../models/favourite';
import { Store } from '../services/store/Store';

interface FavouriteStoreState {
    list: Array<FavouriteModel>
}

export class FavouriteStore extends Store<FavouriteStoreState> {

    constructor() {
        const initState: FavouriteStoreState = {
            list: [],
        };

        super(initState);

        this.refresh();
    }

    getById = (id: number) => {
        if (this.state.list) {
            return this.state.list.find((value: FavouriteModel) => value.id === id);
        }

        return undefined;
    };

    refresh = async() => {
        this.state.list = [];

        let res;
        try {
            res = await UserApi.getFavs();
        }
        catch(err) {
            console.error(err);
        }

        if (res.status === 2000 && res.body) {
            res.body.forEach((elem: FavouriteModel) => this.state.list.push(elem));
        }
    };

    public addActions(): void {
        this.addAction({
            name: 'FAVOURITE_FULL',
            operation: ({payload}) => this.state.list.push({id: payload} as FavouriteModel),
        });

        this.addAction({
            name: 'FAVOURITE_ADD',
            operation: ({payload}) => this.state.list.push({id: payload} as FavouriteModel),
        });

        this.addAction({
            name: 'FAVOURITE_REMOVE',
            operation: ({payload}) => this.state.list = this.state.list.filter((elem) => elem.id !== payload),
        });
    }
}

export default new FavouriteStore();
