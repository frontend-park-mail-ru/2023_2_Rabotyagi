import './menu.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent, VDomNode } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { TextLink, TextLinkProps, TextLinkType } from '../../../components/baseComponents';

export type MenuType = 'sidebar' | 'page';

export interface MenuProps {
    variant?: MenuType,
    selected_index?: number,
    options: Array<TextLinkProps>,
}

export interface MenuState {
    selected_index: number,
}

export class Menu extends Component<MenuProps, MenuState> {

    public componentDidMount() {
        this.state = {
            selected_index: this.props.selected_index || 0,
        }
    }

    getTextLinks() {
        let links: Array<VDomNode> = [];
        let selectedIndex = this.state ? this.state.selected_index : this.props.selected_index;
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
                            selected_index: index,
                        });
                        link.onclick();
                    },
                }
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
        )
    }
}