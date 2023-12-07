import './PasswordField.scss';

import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';

import { Button } from '../button/Button';
import { PasswordInputProps, BaseInput } from '../Input/Input';

type FieldType = 'password' | 'text';

export interface PasswordFieldState {
    type: FieldType,
    preventType: FieldType,
}

export class PasswordField extends Component<PasswordInputProps, PasswordFieldState> {

    state: PasswordFieldState = {
        type: 'password',
        preventType: 'text',
    };

    setType(newType: FieldType) {
        // к сожалению, пришлось вставить сюда костыль до окончательного решения
        if (newType !== this.state.type) {
            this.setState({
                preventType: this.state.type,
                type: newType,
            });
        }
    }

    render() {
        const inputProps: PasswordInputProps = {
            placeholder: 'Пароль',
            autocomplete: 'new-password',
            required: true,
            class: 'input-field',
            type: this.state.type,
            textType: 'regular',
            ...this.props,
        };

        return createElement(
            'div',
            { class: 'password-field' },
            createComponent(
                BaseInput, { ...inputProps },
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
                    },
                },
            ),
        );
    }
}
