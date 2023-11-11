import { preTree, searchNode, tree } from "../utils/categoryTree"
import { CategoryApi } from "../api/category";

export const categories = {
    init: async function() {
        const res = await CategoryApi.getAll();
        this.list = preTree(res.body);
        this.root = tree(this.list);
    },

    getById: function(id) {
        return searchNode(this.root, id);
    },

    root: null,
    list: null,
}