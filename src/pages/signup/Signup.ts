import './Signup.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Caption } from '../../components/Caption/Caption';
import { Text, Button, TextInput, ErrorMessageBox, PasswordField } from '../../components/baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import logo from '../../assets/icons/logo.svg';

export interface SignupState {
    error: string,
    email: string,
    password: string,
    repeatPassword: string
};

export class Signup extends Component<never, SignupState> {

    state = {
        error: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    setError(error: string) {
        this.setState((state) => {
            state = { ...this.state };
            state.error = error;
            return state;
        });
    };

    render() {
        return createElement(
            'div',
            { class: 'signup' },
            createElement(
                'form',
                { class: 'signup_content' },
                createComponent(
                    Button,
                    {
                        leftIcon: { content: logo },
                        variant: 'neutral',
                        subvariant: 'outlined',
                        style: 'height: auto; padding: 0;',
                        onclick: () => { Navigate.navigateTo('/') }
                    } 
                ),
                createComponent(
                    Text,
                    {
                        tag: 'p',
                        variant: 'subheader',
                        text: 'Регистрация в «GoodsGalaxy»'
                    }
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: 'Электронная почта',
                        autocomplete: 'email',
                        required: true,
                        class: 'input-field',
                        oninput: (e) => { },
                    }
                ),
                createComponent(
                    PasswordField, {}
                ),
                createComponent(
                    PasswordField, {}
                ),
                (this.state.error !== '') ?
                    createComponent(
                        ErrorMessageBox,
                        { text: this.state.error }
                    ) : createText(''),
                createComponent(
                    Button,
                    {
                        variant: 'primary',
                        text: 'Продолжить',
                        style: 'width: 100%;',
                        type: 'submit'
                    }
                )
            ),
            createElement(
                'div',
                { class: 'info' },
                createComponent(
                    Caption,
                    { text: 'Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности' }
                ),
                createComponent(
                    Caption,
                    { text: 'Передаваемые данные' }
                )
            ),
        )
    };
}