import { getResourceUrl } from '../../../shared/utils/getResource';
import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface ImageProps {
    src?: string | null,
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

        const {width, height, src, ...etc} = this.props;

        if (src) {
            return createElement(
                'img',
                {
                    style: `width: ${width}; height: ${height}`,
                    src: src,
                    ...etc,
                },
            );
        }

        return createElement(
                'img',
                {
                    style: `width: ${width}; height: ${height}`,
                    ...etc,
                },
            );
    }
}
