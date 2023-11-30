import { Component } from "../component";

export type VDomPropType = string | number | boolean | Function; 

export type VDomPropsType = {
    [key: string]: VDomPropType
};

export interface VDomElement {
    kind: 'element'
    tag: string
    children?: Array<VDomNode>
    props?: VDomPropsType
    key: string | number
};

export interface VDomText {
    kind: 'text'
    value: string
    key: string | number
};

export interface VDomComponent {
    kind: 'component',
    instance?: Component<any, any>,
    props: object,
    children: Array<VDomNode>,
    component: { new(): Component<any, any> },
    key: string | number
};

export type VDomNode = VDomText | VDomElement | VDomComponent;

export const createText = (
    value: string | number | boolean,
    key: string = ''
): VDomText => {
    return ({
        kind: 'text',
        value: value.toString(),
        key: key
    });  
};

// парсер необходим для svg-элементов
const parser = new DOMParser();

export const createElement = (
    tag: string,
    props: VDomPropsType,
    ...children: Array<VDomNode>
): VDomElement => {
    return ({
        kind: 'element',
        tag: tag,
        props: props,
        children: [...children],
        key: tag
    });
};

export const createComponent = <PropsType extends object>(
    component: { new(): Component<PropsType, any> },
    props: PropsType,
    ...children: Array<VDomNode>
): VDomComponent => {
    return ({
        kind: 'component',
        props: props,
        children: children,
        component: component,
        key: component.name
    });
};

export const renderVDomNode = (rootNode: VDomNode): HTMLElement | Text => {
    if (rootNode.kind == 'text') {
        return document.createTextNode(rootNode.value.toString());
    };

    if (rootNode.kind == 'element') {
        if (rootNode.tag == 'svg-element') {
            if (!rootNode.props) {
                throw new Error('');
            }
            const svgElement = parser.parseFromString(rootNode.props['svgcontent'].toString(), 'image/svg+xml');
            
            return svgElement.documentElement;
        }

        const element = document.createElement(rootNode.tag);

        Object.keys(rootNode.props || {}).forEach((prop) => {
            if (rootNode.props) {
                if (prop == 'class') {
                    rootNode.props[prop].toString().split(' ').forEach((elementClass) => {
                        if (elementClass !== '') {
                            element.classList.add(elementClass);
                        }
                    });
                } else {
                    (element as any)[prop] = rootNode.props[prop];
                }
            }
        });

        (rootNode.children || []).forEach((child) => {
            element.appendChild(renderVDomNode(child));
        });

        return element;
    }

    if (rootNode.instance) {
        const element = renderVDomNode(rootNode.instance.render());
        rootNode.instance.notifyMounted(element as HTMLElement);
        return element;
    }

    rootNode.instance = new rootNode.component();
    rootNode.instance.setChildren(rootNode.children);
    const element = renderVDomNode(rootNode.instance.initProps(rootNode.props));
    rootNode.instance.notifyMounted(element as HTMLElement);
    return element;
};


export const renderToElementDyId = (elementId: string, node: VDomNode): HTMLElement => {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element with this id is undefined');
    }
  
    const parentElement = element.parentElement;
    if (!parentElement) {
        throw new Error('Parent elment is undefined');
    }

    element.replaceWith(renderVDomNode(node));

    return parentElement.children[0] as HTMLElement;
};