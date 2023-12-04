import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface ImageProps {
    href?: string,
    id?: string,
    width?: number,
    height?: number,
    class?: string,
}

export class Image extends Component<ImageProps, never> {

    render() {
        if (!this.props) {
            throw new Error('Image props are undefined');
        }

        return createElement(
            'img',
            {
                ...this.props,
                // href: this.props.href,
            },
        );
    }
}
