import './Input.scss';

import { Component } from '../snail/component';
import { VDomComponent, createComponent, createElement } from '../snail/vdom/VirtualDOM';

import { Text, TextVariants, getTextClass } from '../text/Text';
import { ErrorMessageBox } from '../index';
import { Validate } from '../../../shared/utils/validation';

// здесь прописаны все необходимые типы инпутов для проекта

export interface BaseInputProps {
    id?: string,
    name?: string,
    textType?: TextVariants,
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
    checked?: boolean,
};

export type PasswordInputProps = BaseInputProps & {
};

export type FileInputProps = BaseInputProps & {
    multiple: boolean,
    accept: string,
    text?: string,
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

export class BooleanInput extends Component<CheckboxInputProps, never> {

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

interface FileInputState {
    files?: Array<File>,
    error?: string,
}

export class FileInput extends Component<FileInputProps, FileInputState> {
    protected state: FileInputState = {
        files: [],
    };

    onInputEvent = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;

        if (input.files) {
            const files = Array.from(input.files);

            if (input.accept) {
                const validation = Validate.allowedFormats(input.accept, files);
                if (validation) {
                    this.setState({
                        error: `Недопустимый формат: ${validation}`,
                    });

                    return;
                }
            }

            this.setState({
                files: files,
            });

            if (this.props?.oninput) {
                this.props.oninput(e);
            }
        }

    };

    render() {
        if (!this.props) { throw new Error(errorInputMessage); }

        let {text, oninput, ...other} = this.props; // eslint-disable-line prefer-const, @typescript-eslint/no-unused-vars
        let error: VDomComponent[] = [];
        const fileNames: VDomComponent[] = [];

        if (text === undefined) {
            text = 'Выбрать файлы';
        }

        if (this.state.error) {
            error = [
                createComponent(
                    ErrorMessageBox,
                    {
                        text: this.state.error,
                    },
                ),
            ];
        }

        if (this.state.files && !this.state.error) {
            this.state.files.forEach((file) => fileNames.push(
                createComponent(
                    Text,
                    {text: file.name},
                ),
            ));
        }

        return createElement(
            'div',
            {class: 'input-base'},
            createElement(
                'div',
                {
                    class: 'input-container',
                },
                createElement(
                    'input',
                    {
                        class: 'input-container-file',
                        type: 'file',
                        oninput: this.onInputEvent,
                        ...other,
                    },
                ),
                createElement(
                    'label',
                    {class: 'input-container-label'},
                    createComponent(
                        Text,
                        {text},
                    ),
                ),
            ),
            ...fileNames,
            ...error,
        );
    }
}
