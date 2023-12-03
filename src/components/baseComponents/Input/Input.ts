import './Input.scss';

import { Component } from '../snail/component';
import { createElement } from '../snail/vdom/VirtualDOM';

import { TextTypes, getTextClass } from '../text/Text';

// здесь прописаны все необходимые типы инпутов для проекта

export interface BaseInputProps {
    id?: string,
    name?: string,
    textType?: TextTypes,
    value?: string,
    onchange?: (e?: any) => void,
    onkeypress?: (e?: any) => void,
    onkeyup?: (e?: any) => void,
    oninput?: (e?: any) => void,
    placeholder?: string,
    autocomplete?: string,
    style?: string,
    required?: boolean,
    class?: string,
    type?: string,
}

export type TextInputProps = BaseInputProps & {

};

export type NumberInputProps = BaseInputProps & {
    min?: number,
    max?: number,
    oninput?: Function,
};

export type CheckboxInputProps = Omit<BaseInputProps, 'textType'> & {
    checked: boolean,
};

export type PasswordInputProps = BaseInputProps & {
};

export type FileInputProps = BaseInputProps & {
    multiple: boolean,
    accept: string,
};

const errorInputMessage: string = 'Input settings are undefined';

export class BaseInput extends Component<BaseInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, ...otherProps } = this.props;

        return createElement(
            'input',
            {
                ...otherProps,
                class: getTextClass(textType) + (this.props.class ? ' ' + this.props.class : ''),
            },
        );
    }
}

export class TextInput extends Component<TextInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, ...otherProps } = this.props;

        return createElement(
            'input',
            {
                type: 'text',
                ...otherProps,
                class: getTextClass(textType) + (this.props.class ? ' ' + this.props.class : ''),
            },
        );
    }
}

export class NumberInput extends Component<NumberInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, min, max, ...otherProps } = this.props;

        return createElement(
            'input',
            {
                type: 'number',
                min: (min !== undefined) ? min.toString() : '0',
                max: (max !== undefined) ? max.toString() : '',
                ...otherProps,
                class: getTextClass(textType) + (this.props.class ? ' ' + this.props.class : ''),
            },
        );
    }
}

export class Checkbox extends Component<CheckboxInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        return createElement(
            'input',
            {
                type: 'checkbox',
                ...this.props,
            },
        );
    }
}

export class Password extends Component<PasswordInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, ...otherProps } = this.props;

        return createElement(
            'input',
            {
                type: 'password',
                ...otherProps,
                class: getTextClass(textType) + (this.props.class ? ' ' + this.props.class : ''),
            },
        );
    }
}

export class FileInput extends Component<FileInputProps, never> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        return createElement(
            'input',
            {
                type: 'file',
                ...this.props,
            },
        );
    }
}
