import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Button, Dropdown, TextInput } from '../baseComponents/index';
import logo from '../../assets/icons/logo.svg';
import Navigate from '../../shared/services/router/Navigate';
import UserStore from '../../shared/store/UserStore';
import { logout } from '../../shared/store/commonActions/auth';

export class Header extends Component<never, never>{
    routeToSignin = () => Navigate.navigateTo('/signin');
    routeToSignup = () => Navigate.navigateTo('/signup');
    routeToMain = () => Navigate.navigateTo('/');

    public componentDidMount(): void {

    }

    render() {
        let tail;

        if (!UserStore.isAuth()){
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
                        subvariant: 'primary',
                        onclick: this.routeToSignup,
                    },
                ),
            ];
        }
        else {
            const dropdown = createComponent(
                Dropdown,
                {},
                createComponent(
                    Button,
                    {
                        text: 'Профиль',
                        variant: 'neutral',
                        subvariant: 'tertiary',
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
                            this.applyComponentChanges();
                        },
                    },
                ),
            );
            tail = [
                createComponent(
                    Button,
                    {
                        text: 'Профиль',
                        variant: 'neutral',
                        subvariant: 'primary',
                        leftIcon: undefined,
                        onclick: () => {
                            (dropdown.instance as Dropdown).switchHidden();
                        },
                    },
                    dropdown,
                ),
            ];
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
                },
            ),

            ...tail,
        );
    }
}
