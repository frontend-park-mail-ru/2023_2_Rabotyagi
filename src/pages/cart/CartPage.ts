import './cart.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Header } from '../../components/header/header';
import { OrderFeed } from '../../components/orderFeed/orderFeed';
import { Check } from './check/check';
import { Loader } from '../../components/loader/Loader';
import { Text, Button } from '../../components/baseComponents/index';

import { OrderApi } from '../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../shared/constants/response';

import UserStore from '../../shared/store/user';
import CartStore, { CartStoreAction } from '../../shared/store/cart';
import Navigate from '../../shared/services/router/Navigate';
import Dispatcher from '../../shared/services/store/Dispatcher';

export interface CartPageState {
    loading: boolean,
}

export class CartPage extends Component<never, CartPageState> {

    state = {
        loading: false,
    };

    public componentDidMount(): void {
        if (!UserStore.isAuth()) {
            Navigate.navigateTo('/signin');
        }

        CartStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    async buyAll() {
        try {
            this.setState({ loading: true });
            const resp = await OrderApi.buyAll();
            const body = resp.body;
            if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
                if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                    throw ResponseMessage.USER_MESSAGE;
                }
                else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                    throw ResponseMessage.SERVER_MESSAGE;
                }
                else if (ResponseStatusChecker.IsUserError(resp)) {
                    throw body.error;
                }
            }
            Dispatcher.dispatch({ name: CartStoreAction.BUY_ALL });
        } catch(err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    render() {

        const cartContent: Array<VDomNode> = [];

        if (this.state.loading) {
            cartContent.push(
                createComponent(
                    Loader, {},
                ),
            );
        } else if (CartStore.getGoods().length !== 0) {
            cartContent.push(
                createElement(
                    'div',
                    { class: 'cart-content' },
                    createComponent(
                        OrderFeed, {},
                    ),
                    createComponent(
                        Check, { buyFunction: () => { this.buyAll(); } },
                    ),
                ),
            );
        } else {
            cartContent.push(
                createElement(
                    'div', { class: 'cart-empty-content' },
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            variant: 'subheader',
                            text: 'Пока что в корзине нет товаров',
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            variant: 'primary',
                            text: 'Перейти на главную страницу',
                            onclick: () => { Navigate.navigateTo('/'); },
                        },
                    ),
                ),
            );
        }

        return createElement(
            'div', { class: 'wrapper-cartpage' },
            createComponent(
                Header, { },
            ),
            createElement(
                'div', { class: 'wrapper-cart' },
                createElement(
                    'div', { class: 'cart' },
                    createElement(
                        'div', { class: 'cart-header' },
                        createComponent(
                            Text,
                            {
                                variant: 'subheader',
                                text: 'Корзина ',
                            },
                        ),
                        createComponent(
                            Text,
                            {
                                variant: 'subheader',
                                text: CartStore.getCount(),
                                className: 'cart-count',
                            },
                        ),
                    ),
                    createElement(
                        'div',
                        { class: 'wrapper' },
                        ...cartContent,
                    ),
                ),
            ),
        );
    }
}
