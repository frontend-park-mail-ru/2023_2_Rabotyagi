import './cart.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Header } from '../../components/header/header';
import { OrderFeed } from '../../components/orderFeed/orderFeed';
import { Text } from '../../components/baseComponents/index';

import UserStore from '../../shared/store/user';
import Navigate from '../../shared/services/router/Navigate';

export class CartPage extends Component<never, never> {

    public componentDidMount(): void {
        if (!UserStore.isAuth()) {
            Navigate.navigateTo('/signin');
        }
    }

    render() {
        return createElement(
            'div', { },
            createComponent(
                Header, { },
            ),
            createElement(
                'div',
                { class: 'wrapper-cart' },
                createElement(
                    'div',
                    { class: 'cart' },
                    createElement(
                        'div',
                        { class: 'cart-header' },
                        createComponent(
                            Text,
                            {
                                variant: 'header',
                                text: 'Корзина',
                            },
                        ),
                    ),
                    createElement(
                        'div',
                        { class: 'wrapper' },
                        createComponent(
                            OrderFeed, {},
                        ),
                    ),
                ),
            ),
        );
    }
}
