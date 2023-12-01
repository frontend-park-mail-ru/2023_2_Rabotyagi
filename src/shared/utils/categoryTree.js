class Node {
    id;
    name;
    parentId;
    childs = [];

    constructor({ id, name, parent_id: parentId }){
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}

export const searchNode = (node, id) => {
    if (Array.isArray(node)){
        let parents = [];
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
    let roots = [];
    childs.forEach((value) => {
        value = new Node(value);
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
};
