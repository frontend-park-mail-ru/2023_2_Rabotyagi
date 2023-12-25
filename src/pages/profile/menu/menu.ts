import './menu.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent, VDomNode } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { TextLink, TextLinkProps } from '../../../components/baseComponents';

export type MenuType = 'sidebar' | 'page';

export interface MenuProps {
    variant?: MenuType,
    selectedIndex?: number,
    options: Array<TextLinkProps>,
}

export interface MenuState {
    selectedIndex: number,
}

export class Menu extends Component<MenuProps, MenuState> {

    public componentDidMount() {
        this.state = {
            selectedIndex: this.props.selectedIndex || 0,
        };
    }

    getTextLinks() {
        const links: Array<VDomNode> = [];
        const selectedIndex = this.state ? this.state.selectedIndex : this.props.selectedIndex;
        this.props.options.forEach((link, index) => {
            links.push(createComponent(
                TextLink,
                {
                    ...link,
                    variant: this.props.variant ?
                        (this.props.variant == 'sidebar') ?
                            'default' : 'underline'
                        : 'default',
                    selected: selectedIndex === index,
                    onclick: () => {
                        this.setState({
                            ...this.state,
                            selectedIndex: index,
                        });
                        link.onclick();
                    },
                },
            ));
        });

        return links;
    }

    render() {
        return createElement(
            'div',
            {
                class: 'menu-' + (this.props.variant ? this.props.variant : 'sidebar'),
            },
            ...this.getTextLinks(),
        );
    }
}
