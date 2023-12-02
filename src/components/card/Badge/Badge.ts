import "../cardStyles/card.scss";

import { Component } from "../../baseComponents/snail/component";
import { createComponent, createElement, createText } from "../../baseComponents/snail/vdom/VirtualDOM";

import { Text, Svg } from "../../baseComponents/index";

export interface BadgeProps {
    id?: string,
    class?: string,
    text?: string,
    svgIcon?: string
};

export class Badge extends Component<BadgeProps, {}> {

    render() {
        if (!this.props) {
            throw new Error('Badge settings are undefined');
        }

        const { text, svgIcon, ...otherProps } = this.props;

        if (!text && !svgIcon) {
            throw new Error('Badge must have child');
        }

        return createElement(
            'div',
            { ...otherProps },
            (text) ? 
            createComponent(
                Text, { text: text }
            ) : 
            (svgIcon) ? 
            createComponent(
                Svg, { content: svgIcon, width: 20, height: 20 }
            ) 
            : createText('')    
        )
    };
}