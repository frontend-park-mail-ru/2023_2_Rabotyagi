export const searchNode = (obj, id) => {
    // Ключ ищем в детях
    if (obj.id == id) {
        return obj;
    }

    if (obj.childs === undefined) {
        return undefined;
    }

    if (obj.childs.length === 0) {
        return undefined;
    }
    
    let res = [];

    obj.childs.forEach((value) => {
        res = [ ...res, searchNode(value, id) ]
        return;
    })

    res.filter((value) => value !== undefined);

    if (res.length === 0) {
        return undefined;
    }

    return res[ 0 ];
}

export const preTree = (childs) => {
    childs = childs.map((value) => {
        const { Int64 , Valid } = value.parent_id;
        const item = {
            id: value.id,
            name: value.name,
        }
        if (!Valid) {
            item.parent_id = null;
        }
        else {
            item.parent_id = Int64;
        }

        item.childs = [];

        return item;
    });

    return childs;
}

export const tree = (childs) => {
    var root = {};

    childs.forEach((value) => {
        if (value.parent_id == null) {
            root = value;
            return;
        }

        const parent = searchNode(root, value.parent_id);

        if (parent) {
            parent.childs = [ ...parent.childs, value ]
        }
    })

    return root;
}