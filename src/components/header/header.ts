import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Button, TextInput } from '../baseComponents/index';
import logo from '../../assets/icons/logo.svg';
import Navigate from '../../shared/services/router/Navigate';
import UserStore from '../../shared/store/UserStore';

export class Header extends Component<never, never>{
    // state = {

    // };

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
                        onclick: this.routeToSignup,
                    },
                ),
            ];
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
                },
            ),
            ...tail,
        );
    }
}
