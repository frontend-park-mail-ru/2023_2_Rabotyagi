import './header.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomComponent, VDomElement, createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Button, Dropdown, TextInput, ButtonImage } from '../baseComponents/index';

import CartStore from '../../shared/store/cart';
import Navigate from '../../shared/services/router/Navigate';

import UserStore from '../../shared/store/user';
import { logout } from '../../shared/store/commonActions/auth';

import logo from '../../assets/icons/logo.svg';
import { ProductApi } from '../../shared/api/product';
import { ResponseStatusChecker } from '../../shared/constants/response';
import cart from '../../assets/icons/cart.svg';
import { useDebounce } from '../baseComponents/snail/use/debounce';

export class Header extends Component<never, never>{
    routeToSignin = () => Navigate.navigateTo('/signin');
    routeToSignup = () => Navigate.navigateTo('/signup');
    routeToCart = () => { Navigate.navigateTo('/cart'); };
    routeToMain = () => Navigate.navigateTo('/');
    routeToProfile = () => Navigate.navigateTo('/profile/products');
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
        const cp = this; // eslint-disable-line

        const searchDropdown = createComponent(
            Dropdown,
            {},
        );

        const submitEvent = async(e: SubmitEvent) => {
            e.preventDefault();

            const search = (e.currentTarget as HTMLFormElement).elements[0] as HTMLInputElement;
            const value = search.value;

            const res = await ProductApi.searchFeed(this.currentSearch ? this.currentSearch : value);
            search.value = '';
            Navigate.navigateTo('/', {
                products: res.body,
            });
        };

        const inputEvent = async(e: InputEvent) => {
            const input = e.target as HTMLInputElement;
            if (input.value && (e.data || e.inputType === 'deleteContentBackward')) {
                const res = await ProductApi.search(input.value);

                if (!ResponseStatusChecker.IsSuccessfulRequest(res)){
                    return;
                }

                if (res.body) {
                    const hrefs: Array<VDomComponent> = [];
                    (res.body as Array<string>).forEach((item) => hrefs.push(
                        createComponent(
                            Button,
                            {
                                text: item,
                                variant: 'neutral',
                                style: 'width: 100%; justify-content: start;',
                                onclick: () => cp.currentSearch = item,
                            },
                        ),
                    ));

                    searchDropdown.instance?.setChildren(hrefs);
                    (searchDropdown.instance as Dropdown).switchHidden();
                }

                return;
            }
        };

        const debounced = useDebounce<InputEvent, void>(inputEvent, 500);

        const searchInput = createComponent(
            TextInput,
            {
                class: 'header-search-field-input',
                required: true,
                oninput: debounced,
            },
        );

        return createElement(
            'form',
            {
                class: 'header-search-box',
                onsubmit: submitEvent,
            },
            searchInput,
            searchDropdown,
        );
    }

    public componentDidMount() {
        CartStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    render() {
        let tail = [];

        if (!UserStore.isAuth()){
            tail = [ createElement(
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
            ) ];
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
                        onclick: this.routeToProfile,
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
            tail = [
                createComponent(
                    Button,
                    {
                        variant: 'neutral',
                        leftIcon: {
                            content: cart,
                            height: 28,
                            width: 28,
                        },
                        textvariant: 'regular',
                        text: CartStore.getCount().toString(),
                        onclick: () => { this.routeToCart(); },
                    },
                ),
                createComponent(
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
            ...tail,
        );
    }
}
