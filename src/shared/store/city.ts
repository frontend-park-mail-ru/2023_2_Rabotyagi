import { CityApi } from '../api/city';
import { Store } from '../services/store/Store';

interface CityStoreState {
    list: Array<CityModel>
}

export class CityStore extends Store<CityStoreState> {

    constructor(){
        const initState: CityStoreState = {
            list: [],
        };

        super(initState);
        this.refresh();
    }

    async refresh() {
        const res = await CityApi.getAll();
        this.state.list = res.body as Array<CityModel>;
    }

    // init: async function() {
    //     const res = await CityApi.getAll();
    //     this.list = res.body;
    // },

    getById = (id: number) => this.state.list.find((value) => value.id === id);

    getList = () => this.state.list;

    getFirst = () => this.state.list[0]?.id;

    public addActions(): void {
        this.addAction({
            name: 'CITY_STORE_REFRESH',
            operation: async() => await this.refresh(),
        });
    }

    // refresh: async function() {
    //     const res = await CityApi.getAll();
    //     this.list = res.body;
    // },
    // list: null,
}

export default new CityStore();
