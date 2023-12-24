import './alertMessage.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text } from '../baseComponents';

export interface AlertMessageProps {
    title: string,
    text: string,
}

export class AlertMessage extends Component<AlertMessageProps, never> {

    render() {
        return createElement(
            'div',
            { class: 'alert-message' },
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: 'subheader',
                    text: this.props.title,
                },
            ),
            createComponent(
                Text,
                {
                    tag: 'div',
                    text: this.props.text,
                },
            ),
            ...this.children,
        );
    }
}
