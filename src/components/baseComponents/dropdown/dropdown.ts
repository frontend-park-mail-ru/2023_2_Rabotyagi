import './Dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../svg/Svg';
import { TextInput } from '../input/Input';

import searchIcon from '../../../assets/icons/search.svg';

interface DropdownProps {
    search?: boolean,
    // setHidden: (flag: boolean) => void,
}

interface DropDownState {
    hidden: boolean;
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
        if (!this.props || !this.children) {
            throw new Error('Dropdown settings are undefined');
        }

        if (this.children.length < 1) {
            throw new Error('Dropdown must have at least 1 child');
        }

        if (this.children[0].kind == 'text') {
            throw new Error('Control component must be element or component');
        }

        if (this.children[0].kind == 'element') {
            if (!this.children[0].props) {
                this.children[0].props = {};
            }
            this.children[0].props['onclick'] = () => { this.switchHidden(); }; 
        }

        if (this.children[0].kind == 'component') {
            this.children[0].props = {
                ...this.children[0].props,
                'onclick': () => { this.switchHidden(); },
            }
        }

        return createElement(
            'div',
            { },
            this.children[0],
            createElement(
                'div',
                {
                    class: 'dropdown-container',
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
                (!this.state.hidden) ?
                createElement(
                    'div',
                    { class: 'dropdown-content' },
                    ...this.children.slice(1),
                ) : createText(''),
            ),
        );
    }
}
