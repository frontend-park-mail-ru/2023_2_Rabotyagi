import './PasswordField.scss';

import { Component } from "../snail/component";
import { createComponent, createElement } from "../snail/vdom/VirtualDOM";

import { Button } from '../Button/Button';
import { Password, TextInput, PasswordInputProps } from '../Input/Input';

type FieldType = 'password' | 'text';

export interface PasswordFieldState {
    type: FieldType
};

export class PasswordField extends Component<PasswordInputProps, PasswordFieldState> {

    state: PasswordFieldState = {
        type: 'password'
    };

    setType(newType: FieldType) {
        console.log('SETTYPE');
        this.setState((state) => {
            state = { ...this.state };
            state.type = newType;
            console.log(state);
            return state;
        });
        console.log(this.state);
    };

    render() {
        const inputProps = {
            placeholder: 'Пароль',
            autocomplete: 'new-password',
            required: true,
            class: 'input-field'
        };

        return createElement(
            'div',
            { class: 'password-field' },
            (this.state.type == 'password') ?
                createComponent(
                    Password, { ...inputProps }
                ) :
                createComponent(
                    TextInput,  { ...inputProps }
                ),
            createComponent(
                Button,
                {
                    text: 'показать',
                    variant: 'outlined',
                    type: 'button',
                    mousedown: (e: any) => {
                        e.preventDefault();
                        this.setType('text');
                    },
                    mouseup: (e: any) => {
                        e.preventDefault();
                        this.setType('password');
                    },
                    mouseout: (e: any) => {
                        e.preventDefault();
                        this.setType('password');
                    }
                }
            )
        );
    };
};