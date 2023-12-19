import './checkNote.scss';

import { Component } from "../../../../components/baseComponents/snail/component";
import { createElement, createComponent } from "../../../../components/baseComponents/snail/vdom/VirtualDOM";

import { Text } from "../../../../components/baseComponents";

export type CheckNoteType = 'header' | 'subheader';

export interface CheckNoteProps {
    name: string,
    price: number,
    variant: CheckNoteType,
}

export class CheckNote extends Component<CheckNoteProps, never> {

    getTextVariant = () => this.props.variant == 'header' ? 'subheader' : 'regular'

    render() {
        return createElement(
            'div',
            { class: 'check-note', },
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: this.getTextVariant(),
                    text: this.props.name,
                },
            ),
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: this.getTextVariant(),
                    text: this.props.price.toString() + ' ₽',
                },
            ),
        );
    }
}