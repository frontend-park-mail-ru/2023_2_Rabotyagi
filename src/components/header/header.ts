import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Button, Dropdown, TextInput } from '../baseComponents/index';
import logo from '../../assets/icons/logo.svg';
import Navigate from '../../shared/services/router/Navigate';
import UserStore from '../../shared/store/UserStore';
import { logout } from '../../shared/store/commonActions/auth';
import { ButtonImage } from '../baseComponents/button/Button';

export class Header extends Component<never, never>{
    routeToSignin = () => Navigate.navigateTo('/signin');
    routeToSignup = () => Navigate.navigateTo('/signup');
    routeToMain = () => Navigate.navigateTo('/');
    routeToProductNew = () => {
        if (UserStore.isAuth()){
            Navigate.navigateTo('/product/new');
        }
        else {
            Navigate.navigateTo('/signin');
        }
    };

    render() {
        let tail;

        if (!UserStore.isAuth()){
            tail = createElement(
                'div',
                {
                    class: 'header-auth-box',
                },
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
                        subvariant: 'primary',
                        onclick: this.routeToSignup,
                    },
                ),
            );
        }
        else {
            const dropdown = createComponent(
                Dropdown,
                { },
                createComponent(
                    Button,
                    {
                        text: 'Профиль',
                        variant: 'neutral',
                        subvariant: 'tertiary',
                        onclick: () => Navigate.navigateTo('/profile'),
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Выйти',
                        variant: 'neutral',
                        subvariant: 'tertiary',
                        onclick: async() => {
                            await logout();
                            Navigate.navigateTo('/signin');
                        },
                    },
                ),
            );
            tail = createComponent(
                ButtonImage,
                {
                    variant: 'neutral',
                    subvariant: 'primary',
                    height: 36,
                    width: 36,
                    onclick: () => {
                        (dropdown.instance as Dropdown).switchHidden();
                    },
                },
                dropdown,
            );
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
                    onclick: this.routeToMain,
                },
            ),
            createComponent(
                TextInput,
                {
                    class: 'header-search-box',
                    required: true,
                },
            ),
            createComponent(
                Button,
                {
                    text: 'Разместить объявление',
                    variant: 'neutral',
                    subvariant: 'primary',
                    onclick: this.routeToProductNew,
                },
            ),
            tail,
        );
    }
}
