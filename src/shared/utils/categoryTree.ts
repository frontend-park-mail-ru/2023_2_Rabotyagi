export class TreeNode {
    id: number;
    name: string;
    parentId: number | null;
    childs: Array<TreeNode> = [];

    constructor({ id, name, parent_id: parentId }: {id: number, name: string, parent_id: number | null}){
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}

export function searchNode(node: TreeNode | Array<TreeNode>, id: number) {
    if (Array.isArray(node)){
        let parents: Array<TreeNode | undefined> = [];
        node.forEach((elem) => parents = [...parents, searchNode(elem, id)]);
        parents = parents.filter((parent) => parent !== undefined);

        return parents[0];
    }

    // Ключ ищем в детях
    if (node.id == id) {
        return node;
    }

    if (node.childs === undefined) {
        return undefined;
    }

    if (node.childs.length === 0) {
        return undefined;
    }

    let res: Array<TreeNode | undefined> = [];

    node.childs.forEach((value) => {
        res = [ ...res, searchNode(value, id) ];

        return;
    });

    res = res.filter((value) => value !== undefined);

    if (res.length === 0) {
        return undefined;
    }

    return res[ 0 ];
}

export function tree(childs: Array<CategoryModel>) {
    let roots: Array<TreeNode> = [];

    childs.forEach((elem) => {
        const value = new TreeNode(elem);
        if (value.parentId === null) {
            roots = [...roots, value];

            return;
        }

        const parent = searchNode(roots, value.parentId);

        if (parent) {
            parent.childs = [ ...parent.childs, value ];
        }
    });

    return roots;
}
