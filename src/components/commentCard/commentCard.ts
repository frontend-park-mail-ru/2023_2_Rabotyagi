import './commentCard.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text, Image, TextArea } from '../baseComponents';
import { Rating } from '../rating/rating';

import { getRuDayFormat } from '../../shared/utils/dateConverter';

export type CommentCardType = 'view' | 'own';

export interface CommentCardProps extends CommentModel {
    variant: CommentCardType,
}

export class CommentCard extends Component<CommentCardProps, never> {

    renderView() {
        return createElement(
            'div',
            { class: 'comment-card' },
            createComponent(
                Text,
                {
                    tag: 'div',
                    text: getRuDayFormat(this.props.created_at),
                    className: 'comment-card-date',
                },
            ),
            createElement(
                'div',
                { class: 'comment-card-sender' },
                (this.props.avatar && this.props.avatar.url) ?
                    createComponent(
                        Image,
                        {
                            src: this.props.avatar.url,
                            class: 'comment-card-sender-avatar',
                        },
                    ) :
                    createElement(
                        'div',
                        { class: 'comment-card-sender-avatar' },
                    ),
                createComponent(
                    Text,
                    { text: this.props.sender_name },
                ),
            ),
            createElement(
                'div',
                { class: 'comment-card-info' },
                createComponent(
                    Rating,
                    {
                        variant: 'show',
                        rating: this.props.rating,
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        text: 'Комментарий',
                        className: 'comment-card-info-title',
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        text: this.props.text,
                        className: 'comment-card-info-text',
                    },
                ),
            ),
        );
    }

    renderOwn() {
        return createElement(
            'div',
            { class: 'comment-card' },
            createComponent(
                Text,
                {
                    tag: 'div',
                    text: getRuDayFormat(this.props.created_at),
                    className: 'comment-card-date',
                },
            ),
            createElement(
                'div',
                { class: 'comment-card-sender' },
                (this.props.avatar && this.props.avatar.url) ?
                    createComponent(
                        Image,
                        {
                            src: this.props.avatar.url,
                            class: 'comment-card-sender-avatar',
                        },
                    ) :
                    createElement(
                        'div',
                        { class: 'comment-card-sender-avatar' },
                    ),
                createComponent(
                    Text,
                    { text: this.props.sender_name },
                ),
            ),
            createElement(
                'div',
                { class: 'comment-card-info' },
                createComponent(
                    Rating,
                    {
                        variant: 'edit',
                        rating: this.props.rating,
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        text: 'Комментарий',
                        className: 'comment-card-info-title',
                    },
                ),
                createComponent(
                    TextArea,
                    {
                        className: 'comment-card-info-text',
                    },
                ),
            ),
        );
    }

    render() {

        switch(this.props.variant) {
            case 'view':
                return this.renderView();
            case 'own':
                return this.renderOwn();
            default: 
                return this.renderView();
        }
    }
}
