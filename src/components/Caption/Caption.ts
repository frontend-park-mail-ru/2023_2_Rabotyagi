import "./Caption.scss";

import { Component } from "../baseComponents/snail/component";
import { createComponent } from "../baseComponents/snail/vdom/VirtualDOM";

import { Text } from "../baseComponents/index";

export interface CaptionProps {
    text: string
}

export class Caption extends Component<CaptionProps, {}> {
    render() {
        if (!this.props) {
            throw new Error('Caption settings are undefined');
        };

        return createComponent(
            Text,
            {
                variant: 'caption',
                text: this.props.text,
                additionalClass: 'caption-message'
            },
        );
    };
};