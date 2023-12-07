import { CategoryApi } from '../api/category';
import { CategoryModel } from '../models/category';
import { Store } from '../services/store/Store';
import { Node, searchNode, tree } from '../utils/categoryTree';

interface CategoryStoreState {
    root?: Array<Node>,
    list: Array<CategoryModel>
}

export class CategoryStore extends Store<CategoryStoreState> {

    constructor() {
        const initState: CategoryStoreState = {
            list: [],
        };

        super(initState);
        this.refresh();
    }

    async refresh() {
        const res = await CategoryApi.getAll();
        this.state.root = tree(res.body);
        this.state.list = res.body as Array<CategoryModel>;
    }

    getById = (id: number) => {
        if (this.state.root){
            return searchNode(this.state.root, id);
        }

        return undefined;
    };

    getList = () => this.state.list;

    getFirst = () => this.state.list[0]?.id;

    public addActions(): void {
        this.addAction({
            name: 'CATEGORY_STORE_REFRESH',
            operation: async() => await this.refresh(),
        });
    }
}
// export const categories = {
//     init: async function() {
//         const res = await CategoryApi.getAll();
//         this.root = tree(res.body);
//         this.list = res.body;
//     },

//     getById: function(id) {
//         return searchNode(this.root, id);
//     },

//     refresh: async function() {
//         const res = await CategoryApi.getAll();
//         this.root = tree(res.body);
//         this.list = res.body;
//     },
//     root: null,
//     list: null,
// };

export default new CategoryStore();
