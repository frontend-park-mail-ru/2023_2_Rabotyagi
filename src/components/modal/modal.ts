import './modal.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Button, Text } from '../baseComponents';

interface ModalProps {
    onAccept: () => void,
    onDeny: () => void,
}

export class Modal extends Component<ModalProps, never> {
    render() {
        return createElement(
            'modal',
            { class: 'modal' },
            createElement(
                'div',
                { class: 'modal-content' },
                createComponent(
                    Text,
                    { text: 'Длительность подписки' },
                ),
                ...this.children,
            ),
            createElement(
                'div',
                { class: 'modal-buttons' },
                createComponent(
                    Button,
                    {
                        text: 'Принять',
                        variant: 'primary',
                        onclick: this.props.onAccept,
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Отмена',
                        variant: 'neutral',
                        onclick: this.props.onDeny,
                    },
                ),
            ),
        );
    }
}
