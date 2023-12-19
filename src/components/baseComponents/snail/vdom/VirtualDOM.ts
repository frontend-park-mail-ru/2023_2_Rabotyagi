import { Component } from '../component';
import { checkTagLikeSvgTag, getXMLNS } from './SVGRender';

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
}

export interface VDomText {
    kind: 'text'
    value: string
    key: string | number
}

export interface VDomComponent {
    kind: 'component',
    instance?: Component<any, any>,
    props: object,
    children: Array<VDomNode>,
    component: { new(): Component<any, any> },
    key: string | number
}

export type VDomNode = VDomText | VDomElement | VDomComponent;

export const createText = (
    value: string | number | boolean | null,
    key: string = '',
): VDomText => {
    return ({
        kind: 'text',
        value: value ? value.toString() : '',
        key: key,
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
        key: tag,
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
        key: component.name,
    });
};

export const renderVDomNode = (rootNode: VDomNode): HTMLElement | SVGSVGElement | Text => {
    if (rootNode.kind == 'text') {
        return document.createTextNode(rootNode.value.toString());
    }

    if (rootNode.kind == 'element') {
        if (rootNode.tag == 'svg-element') {
            if (!rootNode.props) {
                throw new Error('');
            }
            const svgElement = parser.parseFromString(rootNode.props['svgcontent'].toString(), 'image/svg+xml');

            return svgElement.documentElement;
        }

        const element = (!checkTagLikeSvgTag(rootNode.tag)) ?
                            document.createElement(rootNode.tag)
                            : document.createElementNS(getXMLNS(rootNode.props), rootNode.tag) as SVGSVGElement;

        Object.keys(rootNode.props || {}).forEach((prop) => {
            if (rootNode.props) {
                if (prop == 'class') {
                    rootNode.props[prop].toString().trim().split(' ').forEach((elementClass) => {
                        if (elementClass !== '') {
                            element.classList.add(elementClass);
                        }
                    });
                } else if (rootNode.props[prop] instanceof Function && !prop.startsWith('on')) {
                    let eventName: any = '';
                    let eventFunc: any = () => {};
                    try {
                        eventName = prop as unknown as EventListenerOrEventListenerObject; // eslint-disable-line no-undef
                        eventFunc = rootNode.props[prop];
                    } catch {
                        throw new Error(prop + ' is not an event name');
                    }
                    element.addEventListener(eventName, eventFunc);
                } else {
                    if (checkTagLikeSvgTag(rootNode.tag)) {
                        element.setAttribute(prop, rootNode.props[prop].toString());
                    } else {
                        (element as any)[prop] = rootNode.props[prop];
                    }
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
