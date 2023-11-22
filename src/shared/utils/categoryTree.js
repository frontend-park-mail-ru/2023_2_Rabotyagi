class Node {
    id;
    name;
    parentId;
    childs = [];

    constructor({ id, name, parentId }){
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}

export const searchNode = (node, id) => {
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

    let res = [];

    node.childs.forEach((value) => {
        res = [ ...res, searchNode(value, id) ];

        return;
    });

    res = res.filter((value) => value !== undefined);

    if (res.length === 0) {
        return undefined;
    }

    return res[ 0 ];
};

export const tree = (childs) => {
    let root;

    childs.forEach((value) => {
        value = new Node(value);

        if (value.parent_id == null) {
            root = value;

            return;
        }

        const parent = searchNode(root, value.parent_id);

        if (parent) {
            parent.childs = [ ...parent.childs, value ];
        }
    });

    return root;
};
