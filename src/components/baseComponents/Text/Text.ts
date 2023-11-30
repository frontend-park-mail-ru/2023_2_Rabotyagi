import "./Text.scss";

import { Component } from "../snail/component";
import { createElement, createText } from "../snail/vdom/VirtualDOM";

export type TextTypes = 'regular' | 'header' | 'subheader' | 'caption';

export const TextPrefix = 'text-';
export const getTextClass = (type: TextTypes | undefined): string => {
    return TextPrefix + (type || 'regular');
};

export interface TextProps {
    id?: string,
    variant?: TextTypes,
    tag?: 'div' | 'span' | 'p',
    text: string | number | boolean,
    style?: string,
    name?: string,
    type?: string,
};

export class Text extends Component<TextProps, {}> {

    render() {
        if (!this.props) {
            throw new Error('Text settings are undefined');
        };

        const { variant, tag, text, ...textProps } = this.props;

        return createElement(
            tag || 'span',
            {
                ...textProps,
                class: getTextClass(variant),
            },
            createText(this.props.text)
        );
    };
}
