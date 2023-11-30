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
    onchange?: Function,
    placeholder?: string,
    autocomplete?: string,
    required?: boolean
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

export class TextInput extends Component<TextInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, ...otherProps } = this.props;

return createElement(
            'input',
            {
                class: getTextClass(textType),
                type: 'text',
                ...otherProps,
            },
        );
    }
}

export class NumberInput extends Component<NumberInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        const { textType, min, max, ...otherProps } = this.props;

return createElement(
            'input',
            {
                class: getTextClass(textType),
                type: 'number',
                min: (min !== undefined) ? min.toString() : '0',
                max: (max !== undefined) ? max.toString() : '',
                ...otherProps,
            },
        );
    }
}

export class Checkbox extends Component<CheckboxInputProps, {}> {

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

export class Password extends Component<PasswordInputProps, {}> {

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        return createElement(
            'input',
            {
                type: 'password',
                ...this.props,
            },
        );
    }
}

export class FileInput extends Component<FileInputProps, {}> {

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
