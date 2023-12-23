import './textArea.scss';

import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface TextAreaProps {
    placeholder?: string,
    oninput?: (e?: any) => void,
}

export class TextArea extends Component<TextAreaProps, {}> {
    render() {
        console.log(this.props);
        return createElement(
            'textarea',
            {
                ...this.props,
                class: 'text-regular',
            },
        );
    }
}
