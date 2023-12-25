import './sidebar.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, VDomElement, createComponent, createElement, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProductBase } from './base';
import { PriceHistory } from '../../../components/priceHistory/priceHistory';
import { AlertMessage } from '../../../components/alertMessage/alertMessage';
import { Button, Svg, Text, ErrorMessageBox } from '../../../components/baseComponents/index';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../../shared/constants/response';

import Navigate from '../../../shared/services/router/Navigate';
import Dispatcher from '../../../shared/services/store/Dispatcher';

import CartStore, { CartStoreAction } from '../../../shared/store/cart';
import MessageStore, { MessageStoreAction } from '../../../shared/store/message';
import UserStore from '../../../shared/store/user';

import { getRuDayFormat } from '../../../shared/utils/dateConverter';

import delivery from '../../../assets/icons/badges/delivery.svg';
import safeDeal from '../../../assets/icons/badges/safe_deal.svg';
import { CommentForm } from '../../../components/commentForm/commentForm';

interface ProductSidebarProps extends UserModel {
    product_id: number,
    price: number,
    price_history?: Array<productPriceUnit> | null,
    parent: ProductBase,
    safe_deal: boolean,
    delivery: boolean,
}

interface ProductSidebarState {
    error: string,
    priceHistoryVisible: boolean,
}

export type PriceGrowingClass = 'up' | 'down' | 'line';

export class ProductSidebar extends Component<ProductSidebarProps, ProductSidebarState> {

    state = {
        error: '',
        priceHistoryVisible: false,
    };

    public componentDidMount() {
        CartStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    setError(newError: string) {
        this.setState({
            ...this.state,
            error: newError,
        });
    }

    routeToSaler = () => {
        if (this.props.id === UserStore.getFields()?.id) {
            Navigate.navigateTo('/profile');
        }
        else {
            Navigate.navigateTo('/saler/products', {salerId: this.props.id});
        }
    };

    getPriceDiffernce(points: Array<productPriceUnit> | null | undefined): number {
        if (!points) {
            return 0;
        }
        if (points.length < 2) {
            return points[0].price;
        }

        return Math.abs(points[points.length - 1].price - points[points.length - 2].price);
    }

    getPriceClass(points: Array<productPriceUnit> | null | undefined): PriceGrowingClass {
        if (!points) {
            return 'line';
        }
        if (points.length < 2) {
            return 'line';
        }
        if (points[points.length - 1].price == points[points.length - 2].price) {
            return 'line';
        }
        if (points[points.length - 1].price > points[points.length - 2].price) {
            return 'up';
        }

        return 'down';
    }

    getPriceText(className: PriceGrowingClass, price: number): string {
        if (className == 'up') {
            return '(↑ ' + price.toString() + ' ₽)';
        }
        if (className == 'down') {
            return '(↓ ' + price.toString() + ' ₽)';
        }

        return '';
    }

    async addInCart() {
        const errorButton = createComponent(
            Button,
            {
                variant: 'outlined',
                text: 'Перейти в корзину',
                onclick: () => {
                    Dispatcher.dispatch({ name: MessageStoreAction.HIDE_MESSAGE });
                    Navigate.navigateTo('/cart');
                },
            },
        );

        try {
            if (!CartStore.sameUser(this.props.id)) {
                if (!MessageStore.getVisible()) {
                    Dispatcher.dispatch({
                        name: MessageStoreAction.SHOW_MESSAGE,
                        payload: createComponent(
                            AlertMessage,
                            {
                                title: 'Внимание!',
                                text: 'В корзину можно добавлять продукты только с одинаковым пользователем',
                            },
                            errorButton,
                        ),
                    });
                }
                throw new Error('Ошибка');
            }
            if (CartStore.hasProduct(this.props.product_id)) {
                throw new Error('Данный продукт уже есть в корзине');
            }
            const resp = await OrderApi.create({
                'count': 1,
                'product_id': this.props.product_id,
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

            Dispatcher.dispatch({ name: CartStoreAction.ADD_GOOD, payload: {
                good: body,
                saler: {
                    id: this.props.id,
                    name: this.props.name,
                    email: this.props.email,
                    avatar: this.props.avatar,
                },
            }});

            if (this.state.error !== '') {
                this.setError('');
            }
        } catch(error: any) {
            this.setError(error.toString());
        }
    }

    renderEditButton = (): Array<VDomComponent> => {
        let content: Array<VDomComponent> = [];

        if(UserStore.isSameUser(this.props.id)){
            content = [
                createComponent(
                    Button,
                    {
                        text: 'Редактировать',
                        variant: 'outlined',
                        style: 'width: 100%;',
                        onclick: this.props.parent.switchEditMode,
                    },
                ),
            ];
        }

        return content;
    };

    public render() {

        const badges: VDomElement[] = [];
        if (!this.props.parent.isEditMode()) {
            if (this.props.safe_deal) {
                badges.push(
                    createElement(
                        'div',
                        {class: 'product-menu-badges-badge'},
                        createComponent(
                            Svg,
                            {
                                content: safeDeal,
                                width: 24,
                                height: 24,
                            },
                        ),
                        createComponent(
                            Text,
                            {text: 'Безопасная сделка'},
                        ),
                    ),
                );
            }

            if (this.props.delivery) {
                badges.push(
                    createElement(
                        'div',
                        {class: 'product-menu-badges'},
                        createElement(
                            'div',
                            {class: 'product-menu-badges-badge'},
                            createComponent(
                                Svg,
                                {
                                    content: delivery,
                                    width: 24,
                                    height: 24,
                                },
                            ),
                            createComponent(
                                Text,
                                {text: 'Возможна доставка'},
                            ),
                        ),
                    ),
                );
            }
        }

        return createElement(
            'sidebar',
            {
                class: 'product-menu',
            },
            createElement(
                'div',
                { class: 'product-menu-price' },
                createComponent(
                    Text,
                    {
                        variant: 'header',
                        text: this.props.price,
                        type: 'price',
                    },
                ),
            ),
            createElement(
                'div',
                { class: 'product-menu-price-history' },
                (this.getPriceClass(this.props.price_history) !== 'line') ?
                    createComponent(
                        Text,
                        {
                            text: this.getPriceText(
                                this.getPriceClass(this.props.price_history),
                                this.getPriceDiffernce(this.props.price_history),
                            ),
                            variant: 'subheader',
                            className: this.getPriceClass(this.props.price_history),
                        },
                    ) : createText(''),
                (this.props.price_history) ?
                    createComponent(
                        Button,
                        {
                            variant: 'outlined',
                            text: 'История цены',
                            onclick: () => {
                                if (!MessageStore.getVisible()) {
                                    Dispatcher.dispatch({
                                        name: MessageStoreAction.SHOW_MESSAGE,
                                        payload: createComponent(
                                            PriceHistory,
                                            {
                                                price: this.props.price,
                                                points: this.props.price_history,
                                            },
                                        ),
                                    });
                                }
                            },
                        },
                    ) :
                    createText(''),
            ),
            createElement(
                'div',
                {
                    class: 'product-menu-saler',
                },
                createElement(
                    'div',
                    {class: 'product-menu-saler-info'},
                    createElement(
                        'div',
                        {class: 'product-menu-saler-info-creds'},
                        createComponent(
                            Text,
                            {
                                variant: 'subheader',
                                text: this.props.name,
                            },
                        ),
                        createComponent(
                            Text,
                            {
                                text: this.props.email,
                            },
                        ),
                    ),
                    createElement(
                        'div',
                        {class: 'product-menu-saler-info-additional'},
                        createComponent(
                            Text,
                            {text: 'на Goods Galaxy с ' + getRuDayFormat(this.props.created_at) },
                        ),
                    ),
                ),
            ),
            (!UserStore.isSameUser(this.props.id) && UserStore.isAuth()) ?
                createComponent(
                    Button,
                    {
                        text: 'Оставить отзыв',
                        variant: 'outlined',
                        style: 'width: 100%;',
                        onclick: () => {
                            if (!MessageStore.getVisible()) {
                                Dispatcher.dispatch({
                                    name: MessageStoreAction.SHOW_MESSAGE,
                                    payload: createComponent(
                                        CommentForm,
                                        { saler: this.props },
                                    ),
                                });
                            }
                        },
                    },
                ) : createText(''),
            (!UserStore.isSameUser(this.props.id)) ?
                (!CartStore.hasProduct(this.props.product_id)) ?
                    createComponent(
                        Button,
                        {
                            text: 'В корзину ',
                            variant: 'primary',
                            style: 'width: 100%;',
                            onclick: () => { this.addInCart(); },
                        },
                    ) :
                    createComponent(
                        Button,
                        {
                            text: 'Данный товар уже в корзине',
                            variant: 'secondary',
                            style: 'width: 100%;',
                            onclick: () => { Navigate.navigateTo('/cart'); },
                        },
                    )
                : createText(''),
            (!UserStore.isSameUser(this.props.id)) ?
                createComponent(
                    Button,
                    {
                        text: 'К продавцу',
                        variant: 'outlined',
                        style: 'width: 100%;',
                        onclick: this.routeToSaler,
                    },
                ) : createText(''),
            ...this.renderEditButton(),

            ...badges,

            (this.state.error !== '') ?
                createComponent(
                    ErrorMessageBox,
                    { text: this.state.error },
                ) :
                createText(''),
        );
    }
}
