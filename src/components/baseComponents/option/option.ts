import './option.scss';

import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';

import { Text } from '../index';

export interface OptionProps {
    key: string,
    value: string,
    selected?: boolean,
}

export class Option extends Component<OptionProps, never> {

    public render() {

        const {selected} = this.props;

        if (selected) {
            return createElement(
                'option',
                {
                    value: this.props.key,
                    selected: 'selected',
                },
                createComponent(
                    Text,
                    {
                        text: this.props.value,
                    },
                ),
            );
        }

        return createElement(
            'option',
            {
                value: this.props.key,
            },
            createComponent(
                Text,
                {
                    text: this.props.value,
                },
            ),
        );

    }
}
