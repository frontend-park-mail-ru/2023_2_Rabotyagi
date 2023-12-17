import './orderCard.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent } from '../baseComponents/snail/vdom/VirtualDOM';

import { Counter } from '../counter/counter';
import { Text, Button, Image } from '../baseComponents/index';

import { OrderApi } from '../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../shared/constants/response';

import { CartStoreAction } from '../../shared/store/cart';
import Dispatcher from '../../shared/services/store/Dispatcher';

export class OrderCard extends Component<OrderModel, never> {

    async updateCount(count: number) {
        try {
            if (!this.props) {
                throw new Error('OrderCard settings are undefined');
            }

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
        if (!this.props) {
            throw new Error('OrderCard settings are undefined');
        }

        return createElement(
            'div',
            { class: 'order-card' },
            createElement(
                'div',
                { class: 'left-content' },
                (this.props.images) ?
                    createComponent(
                        Image,
                        {
                            src: this.props.images[0].url,
                        },
                    )
                    // createElement(
                    //     'img',
                    //     {
                    //         class: 'img',
                    //         src: getResourceUrl(this.props.images[0].url),
                    //     },
                    // )
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
                        className: 'product-price',
                        text: this.props.price + ' ₽ за 1 шт.',
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        className: 'product-title',
                        text: this.props.title,
                    },
                ),
            ),
            createElement(
                'div',
                { class: 'right-content' },
                createComponent(
                    Counter,
                    {
                        unitPrice: this.props.price,
                        minCount: 1,
                        maxCount: this.props.available_count,
                        selectedCount: this.props.count,
                        counterInfluence: (count: number) => { this.updateCount(count); },
                    },
                ),
                createComponent(
                    Button,
                    {
                        variant: 'accent',
                        text: 'Удалить',
                        onclick: () => { this.deleteOrder(); },
                    },
                ),
            ),
        );
    }
}
