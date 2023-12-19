import './messageBox.scss';

import { Component } from '../snail/component';
import { createElement, createComponent } from '../snail/vdom/VirtualDOM';

import { Button } from '..';

import MessageStore, { MessageStoreAction } from '../../../shared/store/message';
import Dispatcher from '../../../shared/services/store/Dispatcher';

export class MessageBox extends Component<never, never> {

    public componentDidMount(): void {
        MessageStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    render() {
        return createElement(
            'div',
            {
                class: 'message-box',
                style: 'display: ' + (MessageStore.getVisible() ? 'flex;' : 'none;'),
            },
            createElement(
                'div',
                { class: 'message-box-content', },
                MessageStore.getMessage(),
            ),
            createElement(
                'div',
                { class: 'message-box-menu', },
                createComponent(
                    Button,
                    {
                        variant: 'primary',
                        text: 'Закрыть',
                        onclick: () => {
                            Dispatcher.dispatch({ name: MessageStoreAction.HIDE_MESSAGE, });
                        },
                    }
                )
            ),
        )
    }
}