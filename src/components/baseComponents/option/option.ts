import './option.scss';
import { Text } from '../index';
import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';

export interface OptionProps {
    key: string,
    value: string,
    selected?: boolean,
}

export class Option extends Component<OptionProps, never> {

    public render() {
        if (!this.props) {
            throw new Error('Option props must be set');
        }

        return createElement(
            'option',
            {
                value: this.props.key,
                'selected': 'selected',
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

// <option value="{{this.id}}">
//     <span class="text-regular">{{this.name}}</span>
// </option>
