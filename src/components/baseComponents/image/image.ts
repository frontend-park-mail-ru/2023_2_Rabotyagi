import { getResourceUrl } from '../../../shared/utils/getResource';
import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export type ImageType = 'avatar';

export interface ImageProps {
    src?: string | null,
    id?: string,
    width?: number | string,
    height?: number | string,
    class?: string,
    style?: string,
    variant?: ImageType
}

export class Image extends Component<ImageProps, never> {

    render() {
        if (this.props.src) {
            this.props.src = getResourceUrl(this.props.src) as string;
        }

        const {width, height, src, style, variant, ...etc} = this.props;

        if (src) {
            return createElement(
                'img',
                {
                    style: `width: ${width}; height: ${height}; ${style}`,
                    src: src,
                    ...etc,
                },
            );
        }

        if (variant === 'avatar') {
            return createElement(
                'img',
                {
                    style: `width: ${width}; height: ${height}; ${style}`,
                    src: '/assets/images/avatar-placeholder.png',
                    ...etc,
                },
            );
        }

        return createElement(
                'img',
                {
                    style: `width: ${width}; height: ${height}; ${style}`,
                    ...etc,
                },
            );
    }
}
