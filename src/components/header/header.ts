import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Button, TextInput } from '../baseComponents/index';
import logo from '../../assets/icons/logo.svg';

export interface HeaderProps {

}

export interface HeaderState {
    authorized: boolean
}

export class Header extends Component<HeaderProps, HeaderState>{
    routeToSignin(): void {

    }

    routeToSignup(): void {

    }

    render() {
        let tail;
        if (!this.state?.authorized){
            tail = [
            createComponent(
                Button,
                {
                    text: 'Войти',
                    variant: 'primary',
                    onclick: this.routeToSignin,
                },
            ),
            createComponent(
                Button,
                {
                    text: 'Зарегистрироваться',
                    variant: 'neutral',
                    onclick: this.routeToSignup,
                },
            )];
        }
        else {
            tail = [createComponent(
                Button,
                {
                    text: 'Профиль',
                    leftIcon: undefined,
                },
            )];
        }

        return createElement(
            'nav',
            {
                class: 'header-nav',
            },
            createComponent(
                Button,
                {
                    text: 'Goods Galaxy',
                    textvariant: 'subheader',
                    leftIcon: {
                        content: logo,
                        height: 40,
                        width: 40,
                    },
                },
            ),
            createComponent(
                TextInput,
                {},
            ),
            createComponent(
                Button,
                {
                    text: 'Разместить объявление',
                    variant: 'neutral',
                },
            ),
            ...tail,
        );
    }
}

// <div class="wrapper">
//     <nav class="header-nav">
//         <div id="header-logo-button"></div>
//         <form class='header-search-box'>
//             <input name="search" class='header-search-input text-regular header-search-field' placeholder='Поиск' autocomplete="off"/>
//         </form>
//         <div id="header-product-create"></div>
//         <div id="header-cart-button"></div>
//         <div id="header-profile-button"></div>
//         <div id="header-auth-box"></div>
//     </nav>
// </div>
