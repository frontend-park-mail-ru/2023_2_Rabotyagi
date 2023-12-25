import './textLink.scss';

import { Component } from '../snail/component';
import { createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Text, Svg } from '..';

export type TextLinkType = 'default' | 'underline';

export interface TextLinkIconProps {
    content: string,
    width?: number,
    height?: number,
    color?: string,
}

export interface TextLinkProps {
    variant?: TextLinkType,
    selected?: boolean,
    icon?: TextLinkIconProps,
    text: string,
    onclick: (e?: any) => void,
}

export class TextLink extends Component<TextLinkProps, never> {

    getDivSelected() {
        if (!this.props.variant) {
            return '';
        }

        if (this.props.variant == 'underline' && this.props.selected) {
            return ' textlink-selected';
        }

        return '';
    }

    render() {
        
        return createElement(
            'div',
            {
                class: 'textlink-' + (this.props.variant ? this.props.variant : 'default') + this.getDivSelected(),
                onclick: this.props.onclick,
            },
            (this.props.icon) ?
                createComponent(
                    Svg,
                    { ...this.props.icon },
                ) :
                createText(''),
            createComponent(
                Text,
                {
                    text: this.props.text,
                    className: this.props.selected ? 'text-selected' : '',
                },
            ),
        );
    }
}
