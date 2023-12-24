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
import { Menu } from '../menu/menu';

type TabVariant = 'all' | 'active' | 'not active';

interface ProfileProductsState {
    loading: boolean,
    products: Array<ProductModelResponse>,
    page?: TabVariant
}

export class ProfileProducts extends Component<never, ProfileProductsState> {
    state: ProfileProductsState = {
        loading: true,
        products: [],
        page: 'all',
    };

    private setLoading(loading: boolean) {
        this.setState({
            loading: loading,
            products: this.state.products,
        });
    }

    public componentDidMount(): void {
        this.getAllProducts();
    }

    routeToProductNew = () => {
        if (UserStore.isAuth()){
            Navigate.navigateTo('/product/new');
        }
        else {
            Navigate.navigateTo('/signin');
        }
    };

    async fetchProducts() {
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

        return resp.body;
    }

    async getAllProducts() {
        const products = await this.fetchProducts();

        this.setState({
            loading: false,
            products: products,
        });
    }

    async getActiveProducts() {
        const products: Array<ProductModelResponse> = await this.fetchProducts();
        const active = products.filter(prod => prod.is_active === true);

        this.setState({
            loading: false,
            products: active,
        });
    }

    async getNotActiveProducts() {
        const products: Array<ProductModelResponse> = await this.fetchProducts();
        const notActive = products.filter(prod => prod.is_active === false);

        this.setState({
            loading: false,
            products: notActive,
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

        return createElement(
            'container',
            { class: 'products-container' },
            ...products,
        );
    }

    public render() {

        return createElement(
            'div',
            { class: 'products' },
            createComponent(
                Menu,
                {
                    variant: 'page',
                    options: [
                        {
                            text: 'Все',
                            onclick: () => {
                                this.setLoading(true);
                                this.getAllProducts();
                            },
                        },
                        {
                            text: 'Активные',
                            onclick: () => {
                                this.setLoading(true);
                                this.getActiveProducts();
                            },
                        },
                        {
                            text: 'Неактивные',
                            onclick: () => {
                                this.setLoading(true);
                                this.getNotActiveProducts();
                            },
                        },
                    ],
                },
            ),
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
