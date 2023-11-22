import { searchNode, tree } from "../utils/categoryTree"
import { CategoryApi } from "../api/category";

export const categories = {
    init: async function() {
        const res = await CategoryApi.getAll();
        this.root = tree(res.body);
        this.list = res.body;
    },

    getById: function(id) {
        return searchNode(this.root, id);
    },

    refresh: async function() {
        const res = await CategoryApi.getAll();
        this.root = tree(res.body);
        this.list = res.body;
    },
    root: null,
    list: null,
}