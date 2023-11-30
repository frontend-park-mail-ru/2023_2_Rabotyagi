import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';
import { Svg } from '../svg/Svg';
import searchIcon from '../../../assets/icons/search.svg';
import { TextInput } from '../Input/Input';

interface DropdownProps {
    search: boolean,
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
        return createElement(
            'div',
            {
                class: 'dropdown-container' + ' ' + (this.state.hidden ? 'hidden' : ''),
            },
            (this.props?.search) ?
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
            createElement(
                'div',
                {
                    class: '',
                },
                ...this.children,
            ),

        );
    }
}
