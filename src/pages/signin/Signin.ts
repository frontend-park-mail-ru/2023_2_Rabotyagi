import "./signin.scss";

import { Component } from "../../components/baseComponents/snail/component";
import { createComponent, createElement } from "../../components/baseComponents/snail/vdom/VirtualDOM";

import { Button } from "../../components/baseComponents/button/Button";
import { Text } from "../../components/baseComponents/Text/Text";
import { Svg } from "../../components/baseComponents/svg/Svg";
import { TextInput } from "../../components/baseComponents/Input/Input";

import { login } from "../../shared/store/commonActions/auth";
import UserStore from "../../shared/store/user";
import Dispatcher from "../../shared/services/store/Dispatcher";

import message from "../../assets/icons/sigin/message.svg";
import free from "../../assets/icons/sigin/free.svg";
import safe from "../../assets/icons/sigin/safe.svg";
import logo from "../../assets/icons/logo.svg";

const TEXT_STYLE: string = 'color: var(--text-secondary);';

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
                        Svg, { content: message }
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
                        Svg, { content: free }
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
                        Svg, { content: safe }
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
                        Svg, { content: logo }
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
                    )
                ),
                createElement(
                    'div',
                    { class: 'right-block-info' }
                ),
            ),
        )    
    };
}
