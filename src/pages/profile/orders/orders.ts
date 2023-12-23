import { Component } from '../../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../components/loader/Loader';
import { Menu } from '../menu/menu';
import { ProfilePlaceholder } from '../placeholder/placeholder';

import { OrderApi } from '../../../shared/api/order';
import { ResponseStatusChecker, ResponseMessage } from '../../../shared/constants/response';

import CartStore from '../../../shared/store/cart';
import UserStore from '../../../shared/store/user';
import { Card } from '../../../components/card/Card';
import { OrderCard } from '../../../components/orderCard/orderCard';
import { Button } from '../../../components/baseComponents/button/Button';
import Navigate from '../../../shared/services/router/Navigate';

export interface ProfileORdersState {
    loading: boolean,
    soldGoods: Array<OrderModel>,
}

export class ProfileOrders extends Component<never, ProfileORdersState> {

    state = {
        loading: true,
        soldGoods: CartStore.getGoods(),
    };

    public componentDidMount(): void {
        this.getSold();
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
            soldGoods: resp.body,
        });
    }

    createContainer() {
        const products: VDomNode[] = [];

        this.state.soldGoods.forEach((order) => products.push(
            createComponent(
                OrderCard,
                { ...order },
            )),
        );

        return products;
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
                            onclick: () => {},
                        },
                        {
                            text: 'Продажи',
                            onclick: () => {},
                        },
                    ],
                },
            ),
            createElement(
                'div',
                { class: 'profile-content', },
                (this.state.loading) ?
                    createComponent(
                        Loader, { },
                    ) :
                (this.state.soldGoods && this.state.soldGoods.length > 0) ?
                    createElement(
                        'container',
                        { class: 'orders-container' },
                        ...this.createContainer(),
                    ) :
                    createElement(
                        'div', 
                        { class: 'empty-box', },
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
