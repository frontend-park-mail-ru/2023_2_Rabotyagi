import './orderFeed.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent, VDomComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { OrderCard } from '../orderCard/orderCard';

import CartStore, { CartStoreAction } from '../../shared/store/cart';
import Dispatcher from '../../shared/services/store/Dispatcher';
import { Loader } from '../loader/Loader';

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
                Loader, {},
            ) :
            createElement(
                'div',
                { class: 'order-feed-content' },
                ...this.createOrders(),
            ),
        );
    }
}
