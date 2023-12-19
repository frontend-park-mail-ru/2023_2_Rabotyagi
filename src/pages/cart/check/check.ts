import './check.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { CheckNote } from './checkNote/checkNote';
import { Text, Button } from '../../../components/baseComponents';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../../shared/constants/response';

import CartStore, { CartStoreAction } from '../../../shared/store/cart';
import Dispatcher from '../../../shared/services/store/Dispatcher';
import Navigate from '../../../shared/services/router/Navigate';

export class Check extends Component<never, never> {

    public componentDidMount(): void {
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
            Dispatcher.dispatch({ name: CartStoreAction.BUY_ALL });
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return createElement(
            'div',
            { class: 'check', },
            createComponent(
                CheckNote,
                {
                    name: 'Товары, ' + CartStore.getCount() + ' шт.',
                    price: CartStore.getPrice(),
                    variant: 'subheader',
                }
            ),
            createComponent(
                CheckNote,
                {
                    name: 'Итого',
                    price: CartStore.getPrice(),
                    variant: 'header',
                }
            ),
            createComponent(
                Button,
                {
                    variant: 'primary',
                    text: 'Оформить заказ',
                    onclick: () => { this.buyAll(); },
                }
            ),
        );
    }
}