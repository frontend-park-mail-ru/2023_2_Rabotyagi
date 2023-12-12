import { CategoryApi } from '../api/category';
import { Store } from '../services/store/Store';
import { TreeNode, searchNode, tree } from '../utils/categoryTree';

interface CategoryStoreState {
    root?: Array<TreeNode>,
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
        const body: Array<CategoryModel> = res.body;
        this.state.list = body;
        this.state.root = tree(body);
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

export default new CategoryStore();
