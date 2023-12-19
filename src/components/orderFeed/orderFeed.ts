import './orderFeed.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent, createText, VDomComponent } from '../baseComponents/snail/vdom/VirtualDOM';

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
    orders: Array<OrderModel>
}

export class OrderFeed extends Component<never, OrderFeedState> {
    state = {
        loading: true,
        error: false,
        orders: [],
    };

    public componentDidMount() {
        CartStore.addStoreUpdater(() => {
            this.setState({
                loading: false,
                error: false,
                orders: CartStore.getGoods(),
            });
        });

        Dispatcher.dispatch({
            name: CartStoreAction.REFRESH,
        });
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
            Dispatcher.dispatch({ name: CartStoreAction.BUY_ALL });
        } catch(err) {
            console.error(err);
        }
    }

    createOrders() {
        const objs: Array<VDomComponent> = [];

        if (this.state.orders.length > 0) {
            this.state.orders.forEach((good) => objs.push(
                createComponent(
                    OrderCard,
                    good,
                ),
            ));
        }

        return objs;
    }

    render() {

        return createElement(
            'div',
            { class: 'order-feed' },
            (this.state.loading) ?
            createComponent(
                Loader,
                {},
            )
            :
            createElement(
                'div',
                { class: 'order-feed-content' },
                ...this.createOrders(),
            ),
        );
    }
}
