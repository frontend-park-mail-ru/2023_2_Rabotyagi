import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomComponent, VDomElement, createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Button, Dropdown, TextInput, ButtonImage } from '../baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import UserStore from '../../shared/store/user';
import { logout } from '../../shared/store/commonActions/auth';

import logo from '../../assets/icons/logo.svg';
import { Product } from '../../shared/api/product';
import { ResponseStatusChecker } from '../../shared/constants/response';

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

    avatar: string | null;
    currentSearch?: string;

    constructor() {
        super();

        const fields = UserStore.getFields();
        this.avatar = null;
        if (fields) {
            this.avatar = fields.avatar;
        }
    }

    private createSearchForm(): VDomElement {
        var cp = this;

        const searchDropdown = createComponent(
            Dropdown,
            {},
        );

        
        const submitEvent = async(e: SubmitEvent) => {
            e.preventDefault();
            debugger

            const search = (e.currentTarget as HTMLFormElement).elements[0] as HTMLInputElement;
            const value = search.value;

            const res = await Product.searchFeed(this.currentSearch ? this.currentSearch : value);
            Navigate.navigateTo('/', {
                products: res.body
            })
        }
        
        const inputEvent = async(e: InputEvent) => {
            const input = e.currentTarget as HTMLInputElement;
            if (input.value && (e.data || e.inputType === 'deleteContentBackward')) {
                const res = await Product.search(input.value);

                if (!ResponseStatusChecker.IsSuccessfulRequest(res)){
                    return;
                }

                if (res.body) {
                    let hrefs: Array<VDomComponent> = [];
                    (res.body as Array<string>).forEach((item) => hrefs.push(
                        createComponent(
                            Button,
                            {
                                text: item,
                                variant: 'neutral',
                                style: 'width: 100%; justify-content: start;',
                                onclick: () => cp.currentSearch = item
                            }
                        )
                    ))
                    
                    searchDropdown.instance?.setChildren(hrefs);
                    (searchDropdown.instance as Dropdown).switchHidden();
                }
                return;
            }
        }

        const searchInput = createComponent(
            TextInput,
            {
                class: 'header-search-box',
                required: true,
                oninput: inputEvent,
            },
        );

        

        return createElement(
            'form',
            {
                onsubmit: submitEvent
            },
            searchInput,
            searchDropdown
        )
    }

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
                    src: this.avatar ? this.avatar : undefined,
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
            this.createSearchForm(),
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
