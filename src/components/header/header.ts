import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Button, TextInput } from '../baseComponents/index';

export interface HeaderProps {

}

export interface HeaderState {

}

export class Header extends Component<HeaderProps, HeaderState>{
    routeToSignin(): void {

    }

    routeToSignup(): void {

    }

    render() {

        return createElement(
            'nav',
            {
                class: 'header-nav',
            },
            createComponent(
                Button,
                {
                    text: 'Logo',
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
            ),
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
