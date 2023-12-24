import './commentForm.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Rating } from '../rating/rating';
import { Text, Button, TextArea } from '../baseComponents';

import { CommentApi } from '../../shared/api/comment';
import { ResponseStatusChecker, ResponseMessage } from '../../shared/constants/response';
import Navigate from '../../shared/services/router/Navigate';

import UserStore from '../../shared/store/user';

export type CommentFormStatus = 'edit' | 'success' | 'error';

export interface CommentFormProps {
    saler: UserModel,
}

export interface CommentFormState {
    rating: number,
    text: string,
    error: '',
    status: CommentFormStatus,
}

export class CommentForm extends Component<CommentFormProps, CommentFormState> {

    state: CommentFormState = {
        rating: 0,
        text: '',
        error: '',
        status: 'edit',
    }

    async addComment() {
        try {
            const resp = await CommentApi.add({
                rating: this.state.rating,
                recipient_id: this.props.saler.id,
                sender_id: UserStore.getFields()?.id,
                text: this.state.text,
            });
            const body = resp.body;
            console.log(resp, body, this.props.saler);
            if (!ResponseStatusChecker.IsRedirectResponse(resp)) {
                if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                    throw ResponseMessage.USER_MESSAGE;
                }
                else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                    throw ResponseMessage.SERVER_MESSAGE;
                }
                else if (ResponseStatusChecker.IsUserError(resp)) {
                    throw body.error;
                }
            }

            this.setState({
                ...this.state,
                error: '',
                status: 'success',
            });
        } catch(err: any) {
            this.setState({
                ...this.state,
                error: err.toString(),
                status: 'error',
            });
        }
    }

    renderEdit() {
        return createElement(
            'div',
            { class: 'comment-form', },
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: 'subheader',
                    text: 'Оставить отзыв о продавце',
                    className: 'comment-form-title',
                },
            ),
            createElement(
                'div',
                { class: 'comment-form-saler', },
                createElement(
                    'div',
                    { class: 'comment-form-saler-avatar', },

                ),
                createElement(
                    'div',
                    { class: 'comment-form-saler-info', },
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            variant: 'regular',
                            text: this.props.saler.name,
                            className: 'comment-form-saler-info-name',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            variant: 'regular',
                            text: this.props.saler.email,
                        },
                    ),
                ),
            ),
            createElement(
                'div',
                { class: 'comment-form-create', },
                createComponent(
                    Rating,
                    {
                        influenceFunc: (rating: number) => {
                            this.state.rating = rating;
                        },
                    }
                ),
                createComponent(
                    TextArea, 
                    { 
                        oninput: (e: Event) => this.state.text = (e.target as HTMLInputElement).value,
                    },
                ),
                createComponent(
                    Button,
                    {
                        variant: 'primary',
                        text: 'Оставить отзыв',
                        onclick: () => { this.addComment(); },
                    },
                ),
            ),
        );
    }

    renderSuccess() {
        return createElement(
            'div',
            { class: 'success-message', },
            createComponent(
                Text,
                {
                    text: 'Отзыв успешно отправлен',
                    variant: 'subheader',
                    className: 'success-message-text',
                },
            ),
            createComponent(
                Button,
                {
                    variant: 'primary',
                    text: 'Перейти к моим отзывам',
                }
            ),
            createComponent(
                Button,
                {
                    variant: 'primary',
                    text: 'Перейти к отзывам продавца',
                }
            ),
        );
    }

    renderError() {
        return createElement(
            'div',
            { class: 'error-message', },
            createComponent(
                Text,
                {
                    text: 'Что-то пошло не так при отправке отзыва',
                    variant: 'subheader',
                    className: 'error-message-text',
                },
            ),
            createComponent(
                Text,
                {
                    tag: 'div',
                    text: this.state.error,
                    className: 'error-message-box',
                }
            ),
        );
    }

    render() {
        console.log(UserStore.getFields());

        switch(this.state.status) {
            case 'edit':
                return this.renderEdit();
            case 'success':
                return this.renderSuccess();
            case 'error':
                return this.renderError();
        }
    }
}