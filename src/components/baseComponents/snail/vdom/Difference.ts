import { VDomElement, VDomNode, VDomPropsType, renderVDomNode } from "./VirtualDOM";

type PropsUpdater = {
    set: VDomPropsType,
    remove: Array<string>
};

interface AppendChild {
    kind: 'append',
    node: VDomNode
};

interface RemoveChild {
    kind: 'remove'
};

interface UpdateFunction {
    kind: 'update',
    props: PropsUpdater,
    children: Array<ChildUpdater>
};

interface ReplaceFunction {
    kind: 'replace',
    newNode: VDomNode,
    callback?: (element: HTMLElement | Text) => void // callback необходим для компонентов
};

interface PassFunction {
    kind: 'pass'
};

export type VDomNodeUpdater = UpdateFunction | ReplaceFunction | PassFunction;
export type ChildUpdater = AppendChild | RemoveChild | VDomNodeUpdater;

const pass = (): PassFunction => {
    return ({ kind: 'pass' });
};

const append = (node: VDomNode): AppendChild => {
    return ({
        kind: 'append',
        node: node
    });
};

const remove = (): RemoveChild => {
    return ({ kind: 'remove' });
};

const update = (
    props: PropsUpdater,
    children: Array<ChildUpdater>
): UpdateFunction => {
    return ({
        kind: 'update',
        props: props,
        children: children
    });
};

const replace = (
    newNode: VDomNode
): ReplaceFunction => {
    return ({
        kind: 'replace',
        newNode: newNode
    });
}

const getSetProps = (node: VDomElement, newNode: VDomElement) => {
    if (!node.props  || !newNode.props) {
        return newNode.props || {};
    };

    const result: VDomPropsType = {};

    Object.keys(newNode.props || {}).forEach((prop) => {
        if (
            node.props 
            && newNode.props 
            && (node.props[prop] != newNode.props[prop])) 
        {
            result[prop] = newNode.props[prop];
        }
    });

    return result;
}

const getRemoveProps = (node: VDomElement, newNode: VDomElement): Array<string> => {
    return Object.keys(node.props || {}).filter((prop) => {
        const index = Object.keys(newNode.props || {}).indexOf(prop);
        return index == -1;
    });
}

export const getDifference = (
    node: VDomNode,
    newNode: VDomNode
): VDomNodeUpdater => {
    if (
        node.kind == 'text' 
        && newNode.kind == 'text' 
        && node.value == newNode.value
    ) {
        return pass();
    };

    if (
        node.kind == 'component' 
        && newNode.kind == 'component'
        && node.component == newNode.component
        && node.instance
    ) {
        newNode.instance = node.instance;
        newNode.instance.setChildren(newNode.children);
        return newNode.instance.setProps(newNode.props);
    };

    if (node.kind == 'component') {
        node.instance?.unmount();
        node.instance = undefined;
        return replace(newNode);
    };

    if (newNode.kind == 'component') {
        newNode.instance = new newNode.component();
        newNode.instance.setChildren(newNode.children);
        return {
            kind: 'replace',
            newNode: newNode.instance.initProps(newNode.props),
            callback: (element) => { newNode.instance?.notifyMounted(element) }
        }
    };

    if (
        (node.kind == 'text' || newNode.kind == 'text')
        || (
            node.kind == 'element'
            && newNode.kind == 'element'
            && node.tag != newNode.tag
        )
    ) {
        return replace(newNode);
    };

    const propsUpdater: PropsUpdater = {
        set: getSetProps(node, newNode),
        remove: getRemoveProps(node, newNode)
    };

    const childrenUpdater: Array<ChildUpdater> = getChildrenDifference((node.children || []), (newNode.children || []));

    return update(propsUpdater, childrenUpdater);
};

const removeBeforeKey = (elements: Array<VDomNode>, key: string | number | undefined): Array<ChildUpdater> => {
    let result: Array<ChildUpdater> = [];

    while (elements[0] && elements[0].key != key) {
        if (elements[0].kind == 'component') {
            elements[0].instance?.unmount();
            elements[0].instance = undefined;
        }
        result.push(remove());
        elements.shift();
    } 

    return result;
}

const appendBeforeKey = (elements: Array<VDomNode>, key: string | number | undefined): Array<ChildUpdater> => {
    let result: Array<ChildUpdater> = [];

    while (elements[0] && elements[0].key != key) {
        const lastElement = elements.shift();
        if (lastElement) {
            result.push(append(lastElement));
        }
    } 

    return result;
}

export const getChildrenDifference = (children: Array<VDomNode>, newChildren: Array<VDomNode>): Array<ChildUpdater> => {
    const copyChildren: Array<VDomNode> = Object.assign([], children);
    const copyNewChildren: Array<VDomNode> = Object.assign([], newChildren);
    const newChildrenKeys: Array<string | number> = newChildren.map(node => node.key);

    let functions: Array<ChildUpdater> = [];

    // ищем первый элемент с одинаковым ключом
    let firstEqualElement: VDomNode | undefined = copyChildren.find((node) => {
       return newChildrenKeys.indexOf(node.key) != -1; 
    });

    while (firstEqualElement !== undefined) {

        // удаляем всех старых детей до первого элемента с одинаковым ключом
        functions = [...functions, ...removeBeforeKey(copyChildren, firstEqualElement.key)];
        // добавляем всех новых детей до первого элемента с одинаковым ключом
        functions = [...functions, ...appendBeforeKey(copyNewChildren, firstEqualElement.key)];

        //далее вычисляем разницу между старым и новым элементами с одинаковым ключом

        const lastChild = copyChildren.shift();
        const lastNewChild = copyNewChildren.shift();
        newChildrenKeys.shift();

        if (lastChild && lastNewChild) {
            functions.push(getDifference(lastChild, lastNewChild));
        }

        firstEqualElement = copyChildren.find((node) => {
            return newChildrenKeys.indexOf(node.key) != -1; 
        });
    }

    // удаляем все старые оставшиеся элементы
    functions = [...functions, ...removeBeforeKey(copyChildren, undefined)];
    // добавляем все новые оставшиеся элементы
    functions = [...functions, ...appendBeforeKey(copyNewChildren, undefined)];

    return functions;
}

export const applyChanges = (element: HTMLElement | Text, difference: VDomNodeUpdater): HTMLElement | Text => {
    if (difference.kind == 'pass') {
        return element;
    };

    if (difference.kind == 'replace') {
        const updatedElement = renderVDomNode(difference.newNode);
        element.replaceWith(updatedElement);
        if (difference.callback) {
            difference.callback(updatedElement);
        }
        return updatedElement;
    }

    if (element instanceof HTMLElement) {
        difference.props.remove.forEach((prop) => {
            element.removeAttribute(prop);
        });    

        Object.keys(difference.props.set).forEach((prop) => {
            if (prop == 'class') {
                if (difference.props.set[prop] !== '') {
                    element.classList.add(difference.props.set[prop].toString());
                }
            } else {
                (element as any)[prop] = difference.props.set[prop];
            }
        });
    };

    applyChildrenChanges(element as HTMLElement, difference.children);

    return element;
};

export const applyChildrenChanges = (element: HTMLElement, functions: Array<ChildUpdater>) => {

    // индекс элемента, к которому нужно применить операцию
    let childIndex: number = 0;
    functions.forEach((func: ChildUpdater, index: number) => {
        if (func.kind == 'pass') {
            return;
        }

        if (func.kind == 'append') {
            if (element.childNodes[index + childIndex - 1]) {
                element.childNodes[index + childIndex - 1].after(renderVDomNode(func.node));
            } else {
                element.appendChild(renderVDomNode(func.node));
            };
            return;
        };

        const childElement = element.childNodes[index + childIndex];

        if (func.kind == 'remove') {
            childElement.remove();
            childIndex -= 1;
            return;
        }

        applyChanges(childElement as HTMLElement | Text, func as VDomNodeUpdater);
    });
};