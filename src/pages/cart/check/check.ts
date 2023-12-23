import './check.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { CheckNote } from './checkNote/checkNote';
import { Button } from '../../../components/baseComponents';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../../shared/constants/response';

import CartStore, { CartStoreAction } from '../../../shared/store/cart';
import Dispatcher from '../../../shared/services/store/Dispatcher';
import Navigate from '../../../shared/services/router/Navigate';

export interface CheckProps {
    buyFunction: (e?: any) => void,
}

export class Check extends Component<CheckProps, never> {

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
                    onclick: this.props.buyFunction,
                }
            ),
        );
    }
}