import './orderCard.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Counter } from '../counter/counter';
import { Text, Button, Image } from '../baseComponents/index';

import { OrderApi } from '../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../shared/constants/response';

import CartStore, { CartStoreAction } from '../../shared/store/cart';
import Dispatcher from '../../shared/services/store/Dispatcher';

import Navigate from '../../shared/services/router/Navigate';

enum MouseButtons {
    LEFT = 0,
    WHEEL = 1,
    RIGHT = 2
}

export class OrderCard extends Component<OrderModel, never> {

    navigateToProduct = (e: MouseEvent) => {
        switch (e.button) {
            case MouseButtons.LEFT:
                if (e.ctrlKey){
                    window.open(`/product?id=${this.props.product_id}`, '_blank');

                    return;
                }

                Navigate.navigateTo(`/product?id=${this.props.product_id}`, { productId: this.props.product_id });
                break;

            case MouseButtons.WHEEL:
                window.open(`/product?id=${this.props.product_id}`, '_blank');
                break;
        }
    };

    async updateCount(count: number) {
        try {

            const resp = await OrderApi.updateCount({
                id: this.props.id,
                count: count,
            });
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

            Dispatcher.dispatch({ name: CartStoreAction.UPDATE_ORDER_COUNT, payload: {
                orderId: this.props.id,
                count: count,
            }});
        } catch(err) {
            // console.log(err);
        }
    }

    async deleteOrder() {
        try {
            if (!this.props) {
                throw new Error('OrderCard settings are undefined');
            }

            const resp = await OrderApi.deleteOrder(this.props.id);
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

            Dispatcher.dispatch({ name: CartStoreAction.DELETE_GOOD, payload: this.props.id });
        } catch(err) {
            // console.log(err);
        }
    }

    render() {
        return createElement(
            'div',
            { class: 'order-card' },
            createElement(
                'div',
                { 
                    class: 'left-content',
                    onclick: this.navigateToProduct, 
                },
                (this.props.images) ?
                    createComponent(
                        Image,
                        {
                            src: this.props.images[0].url,
                        },
                    )
                    :
                    createElement(
                        'div',
                        { class: 'img' },
                    ),
            ),
            createElement(
                'div',
                { class: 'center-content' },
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        variant: 'subheader',
                        text: this.props.title,
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        className: 'product-title',
                        text: CartStore.getSaler().name,
                    },
                ),
            ),
            createElement(
                'div',
                { class: 'counter-content' },
                createComponent(
                    Counter,
                    {
                        unitPrice: this.props.price,
                        minCount: 1,
                        maxCount: this.props.available_count,
                        selectedCount: CartStore.getGood(this.props.id).count,
                        orderId: this.props.id,
                        counterInfluence: (count: number) => { this.updateCount(count); },
                    },
                ),
            ),
            createElement(
                'div', { class: 'price-content' },
                createComponent(
                    Text,
                    {
                        variant: 'subheader',
                        text: this.props.price * this.props.count + ' ₽',
                    },
                ),
            ),
            createComponent(
                Button,
                {
                    variant: 'accent',
                    text: 'Удалить',
                    onclick: () => { this.deleteOrder(); },
                    className: 'order-card-deleting-button',
                },
            ),
        );
    }
}
