import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';
import { Svg } from '../svg/Svg';
import searchIcon from '../../../assets/icons/search.svg';
import { TextInput } from '../Input/Input';

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

// search
//     svg
//     input
// content
//     span ? button
//     span ? button
//     span ? button
//     ...

export class Dropdown extends Component<DropdownProps, DropDownState> {
    protected state: DropDownState = {
        hidden: true,
    };

    public render(): VDomNode {
        if (!this.props) {
            throw new Error('Dropdown settings are undefined');
        }

        return createElement(
            'div',
            {
                class: 'dropdown-container' + (this.props.hidden ? ' hidden' : ''),
            },
            (this.props.search) ?
            createElement(
                'div',
                {
                    class: '',
                },
                createComponent(
                    Svg,
                    {
                        content: searchIcon,
                    },
                ),
                createComponent(
                    TextInput,
                    {},
                ),
            ) : createText(''),
            (!this.props.hidden) ?
            createElement(
                'div',
                {
                    class: 'dropdown-content',
                },
                ...this.children
            ) : createText('')
        );
    }
}
