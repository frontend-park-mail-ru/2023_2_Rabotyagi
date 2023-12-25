import './errorMessageBox.scss';

import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';

import { Text } from '../text/text';

export interface ErrorMessageBoxProps {
    id?: string,
    text: string
}

export class ErrorMessageBox extends Component<ErrorMessageBoxProps, never> {

    render() {
        if (!this.props) {
            throw new Error('Error settings are undefined');
        }

        const { text, ...divProps } = this.props;

        return createElement(
            'div',
            { ...divProps, class: 'error' },
            createComponent(
                Text,
                { tag: 'p', text: text },
            ),
        );
    }
}

