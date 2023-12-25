import './select.scss';

import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';

import { Option } from '../option/option';

interface SelectEvents {
    onchange?: (e: Event) => void,
}

interface SelectProps {
    items: Array<object>,
    key: string,
    value: string,
    select?: string,
    events?: SelectEvents,
}

export class Select extends Component<SelectProps, never> {
    createOptions = () => {
        const {key, value, select} = this.props;

        return this.props.items.map((item: any) => {
            return createComponent(
                Option,
                {
                    key: item[key],
                    value: item[value],
                    selected: item[key] == select ? true : false,
                },
            );
        });
    };

    public render() {

        let props = {};
        if (this.props.events){
            props = {
                ...this.props.events,
            };
        }

        return createElement(
            'select',
            props,
            ...this.createOptions(),
        );
    }
}
