import './Text.scss';

import { Component } from '../snail/component';
import { createElement, createText } from '../snail/vdom/VirtualDOM';

export type TextVariants = 'regular' | 'header' | 'subheader' | 'caption';
export type TextTypes = 'default' | 'price';

export const TextPrefix = 'text-';
export const getTextClass = (type: TextVariants | undefined): string => {
    return TextPrefix + (type || 'regular');
};

export interface TextProps {
    text: string | number | boolean | null,
    id?: string,
    variant?: TextVariants,
    tag?: 'div' | 'span' | 'p',
    style?: string,
    type?: TextTypes,
    name?: string,
    className?: string,
}

export class Text extends Component<TextProps, never> {
    private priceSplit(price: number): string {
        const str = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';

        return str;
    }

    render() {
        const { variant, tag, text, className, type, ...textProps } = this.props;

        let newText = text;

        if (type === 'price' && newText !== undefined) {
            newText = this.priceSplit(newText as number);
        }

        return createElement(
            tag || 'span',
            {
                ...textProps,
                class: (className ? className + ' ' : '') + getTextClass(variant),
            },
            createText(newText),
        );
    }
}

