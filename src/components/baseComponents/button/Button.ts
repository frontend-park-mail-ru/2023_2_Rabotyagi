import './button.scss';

import { Component } from '../snail/component';
import { createElement, createComponent, createText, VDomNode } from '../snail/vdom/VirtualDOM';

import { Text, TextVariants } from '../text/text';
import { Svg } from '../svg/svg';
import { Image } from '../image/image';

export type ButtonTypes = 'primary' | 'neutral' | 'secondary' | 'accent' | 'outlined' | 'base' | 'image';
export type ButtonSubVariantTypes = 'primary' | 'tertiary' | 'outlined';

export interface ButtonIconProps {
    content: string,
    width?: number,
    height?: number,
}

interface ButtonEvents {
    onclick?: (e?: any) => void,
    onmousedown?: (e?: any) => any,
    onmouseup?: (e?: any) => any,
    onmouseout?: (e?: any) => any,
    mousedown?: (e?: any) => any,
    mouseup?: (e?: any) => any,
    mouseout?: (e?: any) => any
}

export interface ButtonProps extends ButtonEvents {
    id?: string,
    variant?: ButtonTypes,
    subvariant?: ButtonSubVariantTypes,
    text?: string | number,
    textvariant?: TextVariants,
    leftIcon?: ButtonIconProps,
    rightIcon?: ButtonIconProps,
    style?: string,
    name?: string,
    type?: string,
    className?: string,
    disabled?: boolean
}

export interface ButtonImageProps extends ButtonEvents {
    src?: string | null,
    width?: number,
    height?: number,
    id?: string,
    variant?: ButtonTypes,
    subvariant?: ButtonSubVariantTypes,
    style?: string,
    name?: string,
    type?: string,
    className?: string,
}

export class Button extends Component<ButtonProps, never> {

    render() {
        if (!this.children) {
            throw new Error('Button settings are undefined');
        }

        const {
            variant, subvariant,
            text, textvariant,
            leftIcon, rightIcon,
            className,
            ...buttonProps
        } = this.props;

        return createElement(
            'button',
            {
                ...buttonProps,
                class: (className ? className : '') + ' button-' + (variant || 'base') + ' ' + (subvariant || ''),
            },
            ...this.children,

            (leftIcon) ?
            createComponent(
                Svg, { ...leftIcon, id: 'left-icon' },
            )
            : createText(''),

            (text !== undefined) ?
            createComponent(
                Text,
                {
                    variant: textvariant || 'regular',
                    text: text,
                    style: 'text-align: center; text-wrap: nowrap;',
                },
            )
            : createText(''),

            (rightIcon) ?
            createComponent(
                Svg, { ...rightIcon, id: 'right-icon' },
            )
            : createText(''),
        );
    }
}

export class ButtonImage extends Component<ButtonImageProps, never> {

    render() {
        const {
            src,
            variant,
            subvariant,
            ...buttonProps
        } = this.props;

        let {
            width,
            height,
        } = this.props;

        if (!width){
            width = 60;
        }

        if (!height) {
            height = 60;
        }

        return createElement(
            'button',
            {
                ...buttonProps,
                class: 'button-' + (variant || 'base') + ' ' + (subvariant || ''),
            },
            createComponent(
                Image,
                {
                    src: src,
                    width: width,
                    height: height,
                },
            ),
            ...this.children,
        );
    }
}
