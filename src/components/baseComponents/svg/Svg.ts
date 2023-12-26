
import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface SvgProps {
    id?: string,
    content: string,
    width?: number,
    height?: number,
    color?: string,
    class?: string,
    style?: string
}

export class Svg extends Component<SvgProps, never> {

    render() {

        const parser = new DOMParser();
        const svgElement = parser.parseFromString(this.props.content, 'image/svg+xml').documentElement;
        svgElement.setAttribute('height', (this.props.height || 60).toString() + 'px');
        svgElement.setAttribute('width', (this.props.width || 60).toString() + 'px');
        svgElement.setAttribute('color', (this.props.color || 'black'));

        if (this.props.id) {
            svgElement.setAttribute('id', this.props.id);
        }
        if (this.props.class) {
            this.props.class.split(' ').forEach((oneClass) => {
                svgElement.classList.toggle(oneClass);
            });
        }

        return createElement(
            'svg-element',
            {
                svgcontent: svgElement.outerHTML,
            },
        );
    }
}
