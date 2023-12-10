import { getResourceUrl } from '../../../shared/utils/getResource/getResource';
import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface ImageProps {
    src?: string,
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

        if (this.props.src) {
            this.props.src = getResourceUrl(this.props.src) as string;
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
