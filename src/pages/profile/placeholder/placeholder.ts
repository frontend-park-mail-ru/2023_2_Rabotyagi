import './placeholder.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Svg, Text } from '../../../components/baseComponents';

import placeholder from '../../../assets/icons/placeholder.svg';

interface ProfilePlaceholderProps {
    text: string
}

export class ProfilePlaceholder extends Component<ProfilePlaceholderProps, never> {

    public render() {

        return createElement(
            'div',
            {class: 'fav-container-placeholder'},
            createComponent(
                Svg,
                {
                    content: placeholder,
                    width: 190,
                    height: 120,
                },
            ),
            createComponent(
                Text,
                {
                    text: this.props?.text,
                    variant: 'regular',
                    className: 'placeholder-text',
                },
            ),
        );
    }
}
