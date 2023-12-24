import { Component } from '../../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../components/loader/Loader';
import { Menu } from '../menu/menu';
import { ProfilePlaceholder } from '../placeholder/placeholder';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import CartStore from '../../../shared/store/cart';
import { OrderCard } from '../../../components/orderCard/orderCard';
import { Button } from '../../../components/baseComponents/button/Button';
import Navigate from '../../../shared/services/router/Navigate';

export interface ProfileORdersState {
    loading: boolean,
    products: Array<OrderModel>,
}

export class ProfileOrders extends Component<never, ProfileORdersState> {

    state = {
        loading: true,
        products: [],
    };

    private setLoading(loading: boolean) {
        this.setState({
            loading: loading,
            products: this.state.products,
        });
    }

    public componentDidMount(): void {
        this.getBuyed();
    }

    async getSold() {
        let resp;
        try {
            resp = await OrderApi.getSold();
        } catch (err) {
            console.error(err);
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                // throw statuses.USER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                // throw statuses.SERVER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // throw body.error;
                return;
            }
        }

        this.setState({
            loading: false,
            products: resp.body,
        });
    }

    async getBuyed() {
        let resp;
        try {
            resp = await OrderApi.getBuyed();

        } catch (err) {
            console.error(err);
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                // throw statuses.USER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                // throw statuses.SERVER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // throw body.error;
                return;
            }
        }

        this.setState({
            loading: false,
            products: resp.body,
        });
    }

    createContainer() {
        const products: VDomNode[] = [];

        debugger;
        this.state.products.forEach((order: OrderModel) => products.push(
            createComponent(
                OrderCard,
                { ...order },
            )),
        );

        return createElement(
            'container',
            { class: 'orders-container' },
            ...products,
        );

    }

    public render() {
        return createElement(
            'orders',
            {},
            createComponent(
                Menu,
                {
                    variant: 'page',
                    options: [
                        {
                            text: 'Покупки',
                            onclick: () => {
                                this.setLoading(true);
                                this.getBuyed();
                            },
                        },
                        {
                            text: 'Продажи',
                            onclick: () => {
                                this.setLoading(true);
                                this.getSold();
                            },
                        },
                    ],
                },
            ),
            createElement(
                'div',
                { class: 'profile-content' },
                (this.state.loading) ?
                    createComponent(
                        Loader, { },
                    ) :
                (this.state.products && this.state.products.length > 0) ?
                    this.createContainer()
                    :
                    createElement(
                        'div',
                        { class: 'empty-box' },
                        createComponent(
                            ProfilePlaceholder,
                            {
                                text: 'Вы пока ничего не купили.\nВсе купленные вами товары будут отображаться на этой вкладке',
                            },
                        ),
                        createComponent(
                            Button,
                            {
                                text: 'В корзину',
                                variant: 'primary',
                                onclick: () => { Navigate.navigateTo('/cart'); },
                            },
                        ),
                    ),
                ),
        );
    }
}
