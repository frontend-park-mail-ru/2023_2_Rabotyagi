import { Option } from '../option/option';
import { Component } from '../snail/component';
import { createComponent, createElement } from '../snail/vdom/VirtualDOM';
import './select.scss';

interface SelectProps {
    items: Array<object>,
    key: string,
    value: string
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
        return createElement(
            'select',
            {},
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
