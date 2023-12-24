import './userCard.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text, Button } from '../baseComponents/index';

export interface UserCardProps {
    id: number,
    name: string,
    email: string,
    avatar?: string,
}

export class UserCard extends Component<UserCardProps, never> {

    render() {
        if (!this.props) {
            throw new Error('UserCard settings are undefined');
        }

        return createElement(
            'div',
            { class: 'user-card' },
            createElement(
                'div',
                { class: 'user-avatar' },
                (this.props.avatar) ?
                    createElement(
                        'img',
                        {
                            class: 'img',
                            src: this.props.avatar,
                        },
                    ) :
                    createElement(
                        'div',
                        { class: 'img' },
                    ),
            ),
            createElement(
                'div',
                { class: 'user-info' },
                createElement(
                    'div',
                    { class: 'top-user-info' },
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            text: this.props.name,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            variant: 'caption',
                            text: this.props.email,
                            className: 'user-email',
                        },
                    ),
                ),
                createElement(
                    'div',
                    { class: 'bottom-user-info' },
                    createComponent(
                        Button,
                        {
                            variant: 'secondary',
                            text: 'Посмотреть профиль',
                        },
                    ),
                ),
            ),
        );
    }
}
