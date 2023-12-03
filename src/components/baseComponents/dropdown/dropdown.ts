import './Dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../svg/Svg';
import { TextInput } from '../input/Input';

import searchIcon from '../../../assets/icons/search.svg';

// примечания к решению:
// прдеполагается, что dropdown всегда будет привязан к компоненту выше
// то есть всегда есть кнопка или строка ввода, которая влияет на состояние компонента dropdown извне
// внешнее воздействие на компонент осуществляется через его пропсы

interface DropdownProps {
    search: boolean,
    hidden: boolean;
}

interface DropDownState {
    hidden: boolean;
}

export class Dropdown extends Component<DropdownProps, DropDownState> {
    protected state: DropDownState = {
        hidden: true,
    };

    public render(): VDomNode {
        if (!this.props) {
            throw new Error('Dropdown props are undefined');
        }

        return createElement(
            'div',
            {
                class: 'dropdown-container',
                hidden: this.props.hidden,
            },
            (this.props.search) ?
            createElement(
                'div',
                { class: 'dropdown-search' },
                createComponent(
                    Svg, { content: searchIcon },
                ),
                createComponent(
                    TextInput, {},
                ),
            ) : createText(''),
            (!this.props.hidden) ?
            createElement(
                'div',
                { class: 'dropdown-content' },
                ...this.children,
            ) : createText(''),
        );
    }
}
