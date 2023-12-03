import './Header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text, Button, Svg, TextInput } from '../baseComponents/index';

import { Store } from '../../shared/store/Store';

import Navigate from '../../shared/services/router/Navigate';

import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';

export class Header extends Component<never, never> {

    public componentDidMount(): void {
        Store.user.addStoreUpdater(() => { this.applyComponentChanges() });
    }

    render() {
        return createElement(
            'div',
            { class: 'wrapper' },
            createElement(
                'nav',
                { class: 'header-nav' },
                createComponent(
                    Button,
                    { 
                        variant: 'neutral',
                        leftIcon: { content: logo },
                        text: 'GoodsGalaxy',
                        textvariant: 'subheader',
                        onclick: () => { Navigate.navigateTo('/') }
                    }
                ),
                createElement(
                    'form',
                    { },
                    createComponent(
                        TextInput, 
                        {
                            placeholder: 'Поиск',
                            autocomplete: 'off',
                            class: 'header-search-input header-search-field'
                        }
                    ),
                    createComponent(
                        Button,
                        {
                            variant: 'neutral',
                            subvariant: 'primary',
                            text: 'Разместить объявление'
                        }
                    ) 
                )
            )
        )
    };
};