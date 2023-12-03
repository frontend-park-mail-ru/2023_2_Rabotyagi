import './Signin.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Cell } from './cell/Cell';
import { Caption } from '../../components/caption/Caption';
import { Text, Button, TextInput, Password, ErrorMessageBox } from '../../components/baseComponents/index';

// import { login } from '../../shared/store/commonActions/auth';
// import Dispatcher from '../../shared/services/store/Dispatcher';

import Navigate from '../../shared/services/router/Navigate';

import { Validate } from '../../shared/utils/validation';

import message from '../../assets/icons/sigin/message.svg';
import free from '../../assets/icons/sigin/free.svg';
import safe from '../../assets/icons/sigin/safe.svg';
import logo from '../../assets/icons/logo.svg';
import { Auth } from '../../shared/api/auth';
import { ResponseMessage, ResponseStatusChecker } from '../../shared/constants/response';
import { login } from '../../shared/store/commonActions/auth';

export interface SigninPageState {
    error: string,
    email: string,
    password: string
}

export class SigninPage extends Component<{}, SigninPageState> {
    routeToMain = (): void => Navigate.navigateTo('/');
    routeToSignup = (): void => Navigate.navigateTo('signup');

    state = {
        error: '',
        email: '',
        password: '',
    };

    check(): string | null {
        const errorEmail = Validate.email(this.state.email);
        if (errorEmail) {
            return errorEmail;
        }

        const errorPassword = Validate.password(this.state.password);
        if (errorPassword) {
            return errorPassword;
        }

        return null;
    }

    signinEvent = async() => {
        const error = this.check();

        if (error){
            this.setError(error);

            return;
        }
        let resp;
        try {
            resp = await Auth.signin(this.state.email, this.state.password);
        } catch (err) {
            console.error(err);
            // errorBox.innerHTML = '';
            // errorBox.appendChild(ErrorMessageBox(err));

            // return false;
        }

            // const body = resp.body;

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                throw ResponseMessage.USER_MESSAGE;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                throw ResponseMessage.SERVER_MESSAGE;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // throw resp.body.error;
            }
        }

        await login();

        Navigate.navigateTo('/');
            // return true;
    };

    setError(error: string) {
        // this.setState((state) => {
        //     state = { ...this.state };
        //     state.error = error;

        //     return state;
        // });
        this.setState({
            error: error,
        } as SigninPageState);
    }

    render() {
        return createElement(
            'div',
            {
                class: 'signin-page',
                // keydown: () => { this.signinEvent(); },
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
                            onclick: this.routeToMain,
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
                            onchange: (e: Event) => {
                                const elem = e.target as HTMLInputElement;
                                this.state.email = elem.value;
                            },
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
                            onchange: (e: Event) => {
                                const elem = e.target as HTMLInputElement;
                                this.state.password = elem.value;
                            },
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
                            onclick: this.signinEvent,
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Регистрация',
                            variant: 'neutral',
                            subvariant: 'primary',
                            style: 'width: 100%;',
                            onclick: this.routeToSignup,
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
