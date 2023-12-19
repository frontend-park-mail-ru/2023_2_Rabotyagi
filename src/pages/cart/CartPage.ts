import './cart.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Header } from '../../components/header/header';
import { OrderFeed } from '../../components/orderFeed/orderFeed';
import { Check } from './check/check';
import { Text, Button } from '../../components/baseComponents/index';

import UserStore from '../../shared/store/user';
import CartStore from '../../shared/store/cart';
import Navigate from '../../shared/services/router/Navigate';

export class CartPage extends Component<never, never> {

    public componentDidMount(): void {
        if (!UserStore.isAuth()) {
            Navigate.navigateTo('/signin');
        }

        CartStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    render() {
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
                                variant: 'header',
                                text: 'Корзина ',
                            },
                        ),
                        createComponent(
                            Text,
                            {
                                variant: 'header',
                                text: CartStore.getCount(),
                                className: 'cart-count',
                            }
                        )
                    ),
                    createElement(
                        'div',
                        { class: 'wrapper' },
                        (CartStore.getGoods().length !== 0) ?
                            createElement(
                                'div',
                                { class: 'cart-content', },
                                createComponent(
                                    OrderFeed, {},
                                ),
                                createComponent(
                                    Check, {},
                                )
                            ) :
                            createComponent(
                                Text, 
                                {
                                    tag: 'div',
                                    variant: 'subheader',
                                    text: 'Пока что в корзине нет товаров',
                                }
                            ),
                    ),
                ),
            ),
        );
    }
}
