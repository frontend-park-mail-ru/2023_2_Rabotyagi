import './textArea.scss';

import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface TextAreaProps {
    height?: string,
    oninput?: (e?: any) => void,
}

export class TextArea extends Component<TextAreaProps, {}> {
    render() {
        const { ...textAreaProps } = this.props;

        return createElement(
            'textarea',
            {
                ...textAreaProps,
            },
        );
    }
}
