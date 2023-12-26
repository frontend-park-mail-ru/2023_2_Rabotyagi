import './dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../index';
import { TextInput } from '../index';

import searchIcon from '../../../assets/icons/search.svg';
import Navigate from '../../../shared/services/router/Navigate';

interface DropdownProps {
    search?: boolean,
    hidden?: boolean,
}

interface DropDownState {
    hidden: boolean,
    parent?: Component<any,any>
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

    setParent(component: Component<any,any>) {
        // debugger;
        this.state.parent = component;
    }

    public componentDidMount(): void {
        // document.body.addEventListener('click', this.clickOutsideEvent);
        // Navigate.addCallback(() => this.setState({hidden: false}));
    }

    remove = () => this.unmount();

    clickOutsideEvent = (e: Event) => {
        e.preventDefault();

        const element = e.target as HTMLElement;
        // debugger;
        this.domElement?.parentElement;
        element.parentElement?.previousElementSibling;
        // if (element === this.state.parent?.instance?.domElement || element.parentElement === this.state.parent?.instance?.domElement) {
        //     debugger;
        // }
        // (e.target as HTMLElement).parentElement;
    };

    public componentWillUnmount(): void {
        // document.body.removeEventListener('click', this.clickOutsideEvent);
        // Navigate.addCallback(() => this.setState({hidden: false}));
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
