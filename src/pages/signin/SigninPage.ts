import './Signin.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Cell } from './cell/Cell';
import { Caption } from '../../components/caption/Caption';
import { Text, Button, TextInput, Password, ErrorMessageBox } from '../../components/baseComponents/index';

// import { login } from '../../shared/store/commonActions/auth';
// import UserStore from '../../shared/store/user';
// import Dispatcher from '../../shared/services/store/Dispatcher';

import Navigate from '../../shared/services/router/Navigate';

import { Validate } from '../../shared/utils/validation';

import message from '../../assets/icons/sigin/message.svg';
import free from '../../assets/icons/sigin/free.svg';
import safe from '../../assets/icons/sigin/safe.svg';
import logo from '../../assets/icons/logo.svg';

export interface SigninPageState {
    error: string,
    email: string,
    password: string
}

export class SigninPage extends Component<{}, SigninPageState> {

    state = {
        error: '',
        email: '',
        password: '',
    };

    check(email: string, password: string): string | null {
        const errorEmail = Validate.email(email);
        if (errorEmail) {
            return errorEmail;
        }

        const errorPassword = Validate.password(password);
        if (errorPassword) {
            return errorPassword;
        }

        return null;
    }

    signinEvent() {

    }

    setError(error: string) {
        this.setState((state) => {
            state = { ...this.state };
            state.error = error;

            return state;
        });
    }

    render() {
        return createElement(
            'div',
            {
                class: 'signin-page',
                keydown: () => { this.signinEvent(); },
            },
            createElement(
                'div',
                { class: 'left-block' },
                createComponent(
                    Text,
                    { text: 'Войдите, чтобы использовать все возможности' },
                ),
                createComponent(
                    Cell,
                    { svgIcon: message, text: 'Общение об объявлениях в чатах' },
                ),
                createComponent(
                    Cell,
                    { svgIcon: free, text: 'Бесплатное размещение объявлений' },
                ),
                createComponent(
                    Cell,
                    { svgIcon: safe, text: 'Покупки со скидкой по безопасной сделке' },
                ),
            ),
            createElement(
                'div',
                { class: 'right-block' },
                createElement(
                    'div',
                    { class: 'right-block-content' },
                    createComponent(
                        Button,
                        {
                            leftIcon: { content: logo },
                            variant: 'neutral',
                            subvariant: 'outlined',
                            style: 'height: auto; padding: 0',
                            onclick: () => { Navigate.navigateTo('/'); },
                        },
                    ),
                    createComponent(
                        Text,
                        { variant: 'subheader', text: 'Вход в «GoodsGalaxy»' },
                    ),
                    createComponent(
                        TextInput,
                        {
                            id: 'inputEmail',
                            placeholder: 'Электронная почта',
                            style: 'width: 100%;',
                            required: true,
                            autocomplete: 'email',
                        },
                    ),
                    createComponent(
                        Password,
                        {
                            id: 'inputPass',
                            placeholder: 'Пароль',
                            style: 'width: 100%;',
                            required: true,
                            autocomplete: 'current-password',
                        },
                    ),
                    (this.state.error !== '') ?
                    createComponent(
                        ErrorMessageBox,
                        { text: this.state.error },
                    ) : createText(''),
                    createComponent(
                        Button,
                        {
                            text: 'Продолжить',
                            variant: 'primary',
                            style: 'width: 100%;',
                            onclick: () => { this.signinEvent(); },
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Регистрация',
                            variant: 'neutral',
                            subvariant: 'primary',
                            style: 'width: 100%;',
                            onclick: () => { Navigate.navigateTo('signup'); },
                        },
                    ),
                ),
                createElement(
                    'div',
                    { class: 'right-block-info' },
                    createComponent(
                        Caption,
                        { text: 'Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности' },
                    ),
                    createComponent(
                        Caption,
                        { text: 'Передаваемые данные' },
                    ),
                ),
            ),
        );
    }
}
