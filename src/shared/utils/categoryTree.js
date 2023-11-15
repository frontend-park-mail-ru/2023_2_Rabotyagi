class Node {
    id;
    name;
    parent_id;
    childs = [];

    constructor({ id, name, parent_id }){
        this.id = id;
        this.name = name;
        this.parent_id = parent_id;
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
        res = [ ...res, searchNode(value, id) ]
        return;
    })

    res.filter((value) => value !== undefined);

    if (res.length === 0) {
        return undefined;
    }

    return res[ 0 ];
}

export const tree = (childs) => {
    let root;
    childs.forEach((value) => {
        if (value.parent_id == null) {
            root = new Node(value);
            return;
        }

        const parent = searchNode(root, value.parent_id);

        if (parent) {
            parent.childs = [ ...parent.childs, value ]
        }
    })

    return root;
}