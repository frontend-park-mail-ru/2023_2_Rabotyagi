import './dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../svg/svg';
import { TextInput } from '../input/input';

import searchIcon from '../../../assets/icons/search.svg';

interface DropdownProps {
    search?: boolean,
    hidden?: boolean,
}

interface DropDownState {
    hidden: boolean,
}

export class Dropdown extends Component<DropdownProps, DropDownState> {
    protected state: DropDownState = {
        hidden: true,
    };

    switchHidden() {
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    public render(): VDomNode {

        return createElement(
            'div',
            {
                class: 'dropdown-container',
                style: 'top: 44px;',
                hidden: this.state.hidden,
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
            (!this.state.hidden && this.children && this.children.length !== 0) ?
            createElement(
                'div',
                { class: 'dropdown-content' },
                ...this.children,
            ) : createText(''),
        );
    }
}
