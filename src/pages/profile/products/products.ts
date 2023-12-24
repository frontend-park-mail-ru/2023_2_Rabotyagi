import './products.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Card } from '../../../components/card/Card';
import { Loader } from '../../../components/loader/Loader';
import { ProfilePlaceholder } from '../placeholder/placeholder';
import { Button } from '../../../components/baseComponents';

import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import UserStore from '../../../shared/store/user';
import Navigate from '../../../shared/services/router/Navigate';

interface ProfileProductsState {
    loading: boolean,
    products: Array<ProductModelResponse>
}

export class ProfileProducts extends Component<never, ProfileProductsState> {
    state: ProfileProductsState = {
        loading: true,
        products: [],
    };

    public componentDidMount(): void {
        this.getProducts();
    }

    routeToProductNew = () => {
        if (UserStore.isAuth()){
            Navigate.navigateTo('/product/new');
        }
        else {
            Navigate.navigateTo('/signin');
        }
    };

    async getProducts() {
        let resp;
        try {
            resp = await UserApi.getProducts();
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

    removeProduct = (id: number) => {
        this.setState({
            loading: false,
            products: this.state.products.filter((product) => product.id !== id),
        });
    };

    createContainer() {
        const products: VDomNode[] = [];

        this.state.products.forEach((product: ProductModelResponse) => products.push(
            createComponent(
                Card,
                {variant: 'profile', ...product, removeCallback: this.removeProduct},
            )),
        );

        return products;
    }

    public render() {

        return createElement(
            'div',
            { class: 'products' },
            (this.state.loading) ?
                createComponent(
                    Loader, { },
                ) :
            (this.state.products && this.state.products.length > 0) ?
                createElement(
                    'container',
                    { class: 'products-container' },
                    ...this.createContainer(),
                ) :
                createElement(
                    'div',
                    { class: 'empty-box' },
                    createComponent(
                        ProfilePlaceholder,
                        {
                            text: 'У вас пока нет объявлений.\nВсе созданные вами объявления будут на этой вкладке',
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Разместить объявление',
                            variant: 'primary',
                            onclick: this.routeToProductNew,
                        },
                    ),
                ),
        );

    }
}
