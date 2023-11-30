import "./signin.scss";

import { Component } from "../../components/baseComponents/snail/component";
import { createComponent, createElement } from "../../components/baseComponents/snail/vdom/VirtualDOM";

import { Text } from "../../components/baseComponents/Text/Text";
import { Button } from "../../components/baseComponents/button/Button";
import { Svg } from "../../components/baseComponents/svg/Svg";
import { TextInput, Password } from "../../components/baseComponents/Input/Input";

import { login } from "../../shared/store/commonActions/auth";
import UserStore from "../../shared/store/user";
import Dispatcher from "../../shared/services/store/Dispatcher";

import Navigate from "../../shared/services/router/Navigate";

import message from "../../assets/icons/sigin/message.svg";
import free from "../../assets/icons/sigin/free.svg";
import safe from "../../assets/icons/sigin/safe.svg";
import logo from "../../assets/icons/logo.svg";

const TEXT_STYLE: string = 'color: var(--text-secondary);';
const SVG_SIZE: number = 25;

export class Signin extends Component<{}, {}> {

    render() {
        return createElement(
            'div',
            { class: 'signin-page' },
            createElement(
                'div',
                { class: 'left-block' },
                createComponent(
                    Text,
                    { text: 'Войдите, чтобы использовать все возможности' }
                ),
                createElement(
                    'div',
                    { class: 'cell' },
                    createComponent(
                        Svg, { content: message, height: SVG_SIZE, width: SVG_SIZE }
                    ),
                    createComponent(
                        Text, 
                        {
                            text: 'Общение об объявлениях в чатах',
                            style: TEXT_STYLE
                        }
                    )
                ),
                createElement(
                    'div',
                    { class: 'cell' },
                    createComponent(
                        Svg, { content: free, height: SVG_SIZE, width: SVG_SIZE }
                    ),
                    createComponent(
                        Text, 
                        {
                            text: 'Бесплатное размещение объявлений',
                            style: TEXT_STYLE
                        }
                    )
                ),
                createElement(
                    'div',
                    { class: 'cell' },
                    createComponent(
                        Svg, { content: safe, height: SVG_SIZE, width: SVG_SIZE }
                    ),
                    createComponent(
                        Text, 
                        {
                            text: 'Покупки со скидкой по безопасной сделке',
                            style: TEXT_STYLE
                        }
                    )
                )
            ),
            createElement(
                'div',
                { class: 'right-block' },
                createElement(
                    'div',
                    { class: 'right-block-content' },
                    createComponent(
                        Button,
                        {
                            leftIcon: { content: logo },
                            variant: 'neutral',
                            subvariant: 'outlined',
                            style: 'height: auto; padding: 0',
                            onclick: () => { Navigate.navigateTo('/') }
                        }
                    ),
                    createComponent(
                        Text, 
                        {
                            variant: 'subheader',
                            text: 'Вход в «GoodsGalaxy»'
                        }
                    ),
                    createComponent(
                        TextInput,
                        {
                            id: 'inputEmail',
                            placeholder: 'Электронная почта',
                            style: 'width: 100%;',
                            required: true,
                            autocomplete: "email"
                        }
                    ),
                    createComponent(
                        Password,
                        {
                            id: 'inputPass',
                            placeholder: 'Пароль',
                            style: 'width: 100%;',
                            required: true,
                            autocomplete: "current-password"
                        }
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Продолжить',
                            variant: 'primary',
                            style: 'width: 100%;',
                        }
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Регистрация',
                            variant: 'neutral',
                            subvariant: 'primary',
                            style: 'width: 100%;',
                        }
                    )
                ),
                createElement(
                    'div',
                    { 
                        class: 'right-block-info',
                        style: 'display: flex; flex-direction: column; align-items: center; gap: 8px; align-self: stretch;'
                    },
                    createComponent(
                        Text, 
                        {
                            variant: 'caption',
                            text: 'Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности',
                            style: 'text-align: center; ' + TEXT_STYLE, 
                        }
                    ),
                    createComponent(
                        Text, 
                        {
                            variant: 'caption',
                            text: 'Передаваемые данные',
                            style: 'text-align: center; ' + TEXT_STYLE, 
                        }
                    )
                ),
            ),
        )    
    };
}
