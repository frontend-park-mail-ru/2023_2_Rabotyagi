import "./Input.scss";

import { Component } from "../snail/component";
import { createElement } from "../snail/vdom/VirtualDOM";

import { TextTypes, getTextClass } from "../Text/Text";

// здесь прописаны все необходимые типы инпутов для проекта

export interface BaseInputProps {
    id?: string,
    name?: string,
    textType?: TextTypes,
    value?: string,
    onchange?: Function,
    placeholder?: string,
    autocomplete?: string,
    style?: string,
    required?: boolean
}

export type TextInputProps = BaseInputProps & {
    type: 'text'
};

export type NumberInputProps = BaseInputProps & {
    min?: number,
    max?: number,
    oninput?: Function,
    type: 'number'
};

export type CheckboxInputProps = Omit<BaseInputProps, "textType"> & {
    checked: boolean,
    type: 'checkbox'
};

export type PasswordInputProps = BaseInputProps & {
    type: 'password'
};

export type FileInputProps = BaseInputProps & {
    multiple: boolean,
    accept: string,
    type: 'file'
};

const errorInputMessage: string = 'Input settings are undefined';

export class TextInput extends Component<TextInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage) };

        const { textType, ...otherProps } = this.props;
        return createElement(
            'input',
            {
                class: getTextClass(textType),
                ...otherProps
            }
        );
    };
};

export class NumberInput extends Component<NumberInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage) };

        const { textType, min, max, ...otherProps } = this.props;
        return createElement(
            'input',
            {
                class: getTextClass(textType),
                min: (min !== undefined) ? min.toString() : "0",
                ...otherProps
            }
        );
    };
};


export class Checkbox extends Component<CheckboxInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage) };

        return createElement(
            'input',
            { ...this.props }
        );
    };
};

export class Password extends Component<PasswordInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage) };

        return createElement(
            'input',
            { ...this.props }
        );
    };
};

export class FileInput extends Component<FileInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage) };

        return createElement(
            'input',
            { ...this.props }
        );
    };
};