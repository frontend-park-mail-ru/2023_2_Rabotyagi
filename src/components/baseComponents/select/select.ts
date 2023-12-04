import { Option } from '../option/option';
import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';
import './select.scss';

interface SelectEvents {
    onchange?: (e: Event) => void,
}

interface SelectProps {
    items: Array<object>,
    key: string,
    value: string,
    events?: SelectEvents,
}

export class Select extends Component<SelectProps, never> {
    createOptions = () => {
        if (!this.props){
            throw new Error('Select props must be set');
        }

        const {key, value} = this.props;

        return this.props.items.map((item: any) =>
            createComponent(
                Option,
                {
                    key: item[key],
                    value: item[value],
                },
            ),
        );
    };

    public render() {
        if (!this.props) {
            throw new Error('Select props must be set');
        }

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

// <select name="city_id">
//     {{#each cities}}
//     <option value="{{this.id}}">
//         <span class="text-regular">{{this.name}}</span>
//     </option>
//     {{/each}}
// </select>
