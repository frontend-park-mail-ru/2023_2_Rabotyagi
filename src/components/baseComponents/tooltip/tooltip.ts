import './tooltip.scss';
import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';
import { Text } from '..';

interface TooltipProps {
    text: string,
}

export class Tooltip extends Component<TooltipProps, never> {

    public render() {
        return createElement(
            'div',
            {
                class: 'tooltip',
            },
            createElement(
                'div',
                {class: 'tooltip-pointer'},
            ),
            createElement(
                'div',
                {class: 'tooltip-container'},
                createComponent(
                    Text,
                    {text: this.props.text, variant: 'caption', className: 'tooltip-text'},
                ),
            ),
        );
    }
}
