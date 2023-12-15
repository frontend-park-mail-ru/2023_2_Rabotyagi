declare interface CategoryStoreState {
    root?: Array<Node>,
    list: Array<CategoryModel>
}

declare class CategoryStore extends Store<CategoryStoreState> {

    async refresh(): void;

    getById = (id: number) => {
        if (this.state.root){
            return searchNode(this.state.root, id);
        }

        return undefined;
    };

    getList = () => this.state.list;

    getFirst = () => this.state.list[0]?.id;

    public addActions(): void;
}
