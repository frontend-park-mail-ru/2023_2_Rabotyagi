import './sidebar.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, VDomElement, createComponent, createElement, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProductBase } from './base';
import { PriceHistory } from '../../../components/priceHistory/priceHistory';
import { Button, Svg, Text, ErrorMessageBox } from '../../../components/baseComponents/index';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import Navigate from '../../../shared/services/router/Navigate';
import Dispatcher from '../../../shared/services/store/Dispatcher';

import CartStore, { CartStoreAction } from '../../../shared/store/cart';
import MessageStore, { MessageStoreAction } from '../../../shared/store/message';
import UserStore from '../../../shared/store/user';

import star from '../../../assets/icons/star.svg';
import delivery from '../../../assets/icons/badges/delivery.svg';
import safeDeal from '../../../assets/icons/badges/safe_deal.svg';

interface ProductSidebarProps extends UserModel {
    product_id: number,
    price: number,
    price_history?: Array<productPriceUnit> | null,
    // callbacks: Callbacks,
    parent: ProductBase,
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
        CartStore.addStoreUpdater(() => { console.info('CHANGE CART STORE'); this.applyComponentChanges(); });
    }

    setError(newError: string) {
        this.setState({ 
            ...this.state,
            error: newError, 
        });
    }

    routeToSaler = () => {
        if (this.props?.id === UserStore.getFields()?.id) {
            Navigate.navigateTo('/profile');
        }
        else {
            Navigate.navigateTo(`/profile/saler?id=${this.props?.id}`, {salerId: this.props?.id});
        }
    };

    getPriceClass(points: Array<productPriceUnit> | null | undefined, price: number): PriceGrowingClass {
        if (!points) {
            return 'line';
        }

        const reversePoints = points.reverse();
        const nextUnequalElement = reversePoints.find((element) => element.price !== price);
        if (!nextUnequalElement) {
            return 'line';
        }
        if (nextUnequalElement.price == price) {
            return 'line';
        }
        if (nextUnequalElement.price < price) {
            return 'up';
        }

        return 'down';
    }

    getPriceText(className: PriceGrowingClass, price: number): string {
        if (className == 'up') {
            return price.toString() + ' ₽ ↑';
        }
        if (className == 'down') {
            return price.toString() + ' ₽ ↓';
        }

        return price.toString() + ' ₽';
    }

    async addInCart() {
        if (!this.props) {
            throw new Error('ProductSidebar props undefined');
        }

        try {
            if (!CartStore.sameUser(this.props.id)) {
                throw new Error('В корзину можно добавлять продукты только с одинаковым пользователем');
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
                    throw new Error('Ошибка в запросе');
                }
                else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                    throw new Error('Ошибка на сервере');
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

        if (!this.props) {
            throw new Error('ProductSidebar props undefined');
        }

        if(UserStore.isSameUser(this.props.id)){
            content = [
                createComponent(
                    Button,
                    {
                        text: !this.props.parent.isEditMode() ? 'Редактировать' : 'Просмотреть',
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
        if (!this.props) {
            throw new Error('ProductSidebar props undefined');
        }
        if (!this.state) {
            throw new Error('ProductSidebar state undefined');
        }

        let badges: VDomElement[] = [];
        if (!this.props.parent.isEditMode()) {
            badges = [
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
                ),
            ];
        }

        return createElement(
            'sidebar',
            {
                class: 'product-menu',
            },
            createComponent(
                Text,
                {
                    text: this.getPriceText(this.getPriceClass(this.props.price_history, this.props.price), this.props.price),
                    variant: 'subheader',
                    className: this.getPriceClass(this.props.price_history, this.props.price),
                },
            ),
            (this.props.price_history) ?
                createComponent(
                    Button,
                    {
                        variant: 'outlined',
                        text: 'Посмотреть историю цены',
                        onclick: () => {
                            if (this.props && !MessageStore.getVisible()) {
                                Dispatcher.dispatch({
                                    name: MessageStoreAction.SHOW_MESSAGE,
                                    payload: createComponent(
                                        PriceHistory,
                                        {
                                            price: this.props.price,
                                            points: this.props.price_history,
                                        },
                                    )
                                });
                            }
                        },
                    }
                ) :
                createText(''),
            createElement(
                'div',
                {
                    class: 'product-menu-saler',
                },
                createElement(
                    'image',
                    {},
                ),
                createElement(
                    'div',
                    {class: 'product-menu-saler-info'},
                    createElement(
                        'div',
                        {class: 'product-menu-saler-info-creds'},
                        createComponent(
                            Text,
                            {
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
                            {text: 'на Юле с 09 окт 2021'},
                        ),
                        createElement(
                            'div',
                            {class: 'product-menu-saler-info-additional-rating'},
                            ...Array.from({ length: 5 }, () =>
                                createComponent(
                                    Svg,
                                    {
                                        content: star,
                                        width: 24,
                                        height: 24,
                                    },
                                ),
                            ),
                        ),
                    ),
                ),
            ),
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
                    },
                ),
            createComponent(
                Button,
                {
                    text: 'К продавцу',
                    variant: 'outlined',
                    style: 'width: 100%;',
                    onclick: this.routeToSaler,
                },
            ),
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
