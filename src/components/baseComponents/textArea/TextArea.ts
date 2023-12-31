import './textArea.scss';

import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

export interface TextAreaProps {
    placeholder?: string,
    required?: boolean,
    className?: string,
    oninput?: (e?: any) => void,
}

export class TextArea extends Component<TextAreaProps, never> {
    render() {

        return createElement(
            'textarea',
            {
                ...this.props,
                class: 'text-regular' + ((this.props.className && this.props.className !== '') ? ' ' + this.props.className : ''),
            },
        );
    }
}
