import './commentForm.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Rating } from '../rating/rating';
import { ErrorMessageBox } from '../baseComponents';
import { Text, Button, TextArea, Image } from '../baseComponents';

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
    error: string,
    errorRating: string,
    errorText: string,
    status: CommentFormStatus,
}

export class CommentForm extends Component<CommentFormProps, CommentFormState> {

    state: CommentFormState = {
        rating: 0,
        text: '',
        error: '',
        errorRating: '',
        errorText: '',
        status: 'edit',
    }

    async addComment() {
        let errorRating = '';
        let errorText = ''

        if (this.state.rating < 1) {
            errorRating = 'Ошибка';
        }
        if (this.state.text == '') {
            errorText = 'Ошибка';
        }
        if (errorRating !== '' || errorText !== '') {
            this.setState({
                ...this.state,
                errorRating: errorRating,
                errorText: errorText,
            })
            return;
        }

        try {
            const resp = await CommentApi.add({
                rating: this.state.rating,
                recipient_id: this.props.saler.id,
                sender_id: UserStore.getFields()?.id,
                text: this.state.text,
            });
            const body = resp.body;
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
                errorRating: '',
                errorText: '',
                status: 'success',
            });
        } catch(err: any) {
            this.setState({
                ...this.state,
                error: err.toString(),
                errorRating: '',
                errorText: '',
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
                    (this.props.saler.avatar) ?
                    createComponent(
                        Image,
                        { 
                            src: this.props.saler.avatar, 
                            class: 'comment-form-saler-avatar-url',
                        },
                    ) :
                    createElement(
                        'div',
                        { class: 'comment-form-saler-avatar-url', },
                    ),
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
                        textState: (this.state.errorRating  !== '' ? 'error' : 'normal'),
                        influenceFunc: (rating: number) => {
                            this.state.rating = rating;
                        },
                    }
                ),
                createElement(
                    'div',
                    { class: 'comment-form-create-desc', },
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            text: 'Комментарий',
                            className: 'comment-form-create-desc-name',
                        },
                    ),
                ),
                createComponent(
                    TextArea, 
                    { 
                        oninput: (e: Event) => this.state.text = (e.target as HTMLInputElement).value,
                        className: (this.state.errorText !== '') ? 'textarea-error' : '',
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
                    tag: 'div',
                    text: 'Отзыв успешно отправлен',
                    variant: 'subheader',
                    className: 'success-message-text',
                },
            ),
            createComponent(
                Button,
                {
                    variant: 'secondary',
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
                    tag: 'div',
                    text: 'Что-то пошло не так при отправке отзыва',
                    variant: 'subheader',
                    className: 'error-message-text',
                },
            ),
            createComponent(
                ErrorMessageBox,
                { text: this.state.error, },
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