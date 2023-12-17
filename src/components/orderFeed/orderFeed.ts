import './orderFeed.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent, createText, VDomNode } from '../baseComponents/snail/vdom/VirtualDOM';

import { UserCard } from '../userCard/usercard';
import { OrderCard } from '../orderCard/orderCard';
import { Loader } from '../loader/Loader';
import { Text, Button } from '../baseComponents/index';

import { OrderApi } from '../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../shared/constants/response';

import CartStore, { CartStoreAction } from '../../shared/store/cart';
import Dispatcher from '../../shared/services/store/Dispatcher';

export interface OrderFeedState {
    loading: boolean,
    error: boolean,
}

export class OrderFeed extends Component<never, OrderFeedState> {

    state = {
        loading: true,
        error: false,
    };

    componentDidMount() {
        CartStore.addStoreUpdater(() => { this.applyComponentChanges(); });    
    }

    async buyAll() {
        try {
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
            Dispatcher.dispatch({ name: CartStoreAction.BUY_ALL, });
        } catch(err) {
            // console.log(err);
        }
    }

    render() {

        const orders: Array<VDomNode> = [];

        CartStore.getGoods().forEach((good) => {
            orders.push(createComponent(
                OrderCard,
                { ...good },
            ));
        });

        return createElement(
            'div',
            { class: 'order-feed', },
            createElement(
                'div',
                { class: 'order-feed-header', },
                createElement(
                    'div',
                    { class: 'order-feed-price', },
                    createComponent(
                        Text,
                        {
                            tag: 'div',
                            variant: 'header',
                            text: CartStore.getPrice().toString() + ' ₽',
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            variant: 'primary',
                            subvariant: 'primary',
                            style: 'margin-left: 24px;',
                            text: 'Оплатить',
                            onclick: () => { this.buyAll(); },
                        },
                    ),
                ),
                (CartStore.hasUser()) ?
                    createComponent(
                        UserCard,
                        { ...CartStore.getSaler(), },
                    ) :
                    createText(''),
            ),
            createElement(
                'div',
                { class: 'order-feed-content', },
                ...orders,
            )
        );
    }
}