import './products.scss';

import { Component } from '../../../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Card } from '../../../../components/card/Card';
import { Loader } from '../../../../components/loader/Loader';
import { ProfilePlaceholder } from '../../placeholder/placeholder';
import { Text, Button } from '../../../../components/baseComponents';

import { UserApi } from '../../../../shared/api/user';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

import UserStore from '../../../../shared/store/user';
import Navigate from '../../../../shared/services/router/Navigate';
import { Menu } from '../../menu/menu';

type TabVariant = 'all' | 'active' | 'not active';

const allMessage = 'У вас пока нет объявлений.\nВсе объявления будут на этой вкладке';
const activeMessage = 'У вас пока нет активированных объявлений.\nВсе активированные объявления будут на этой вкладке';
const notActiveMessage = 'У вас пока нет неактивных объявлений.\nВсе неактивные объявления будут на этой вкладке';

const getMessage = (variant: TabVariant) => {
    switch(variant) {
        case 'all':
            return allMessage;
        case 'active':
            return activeMessage;
        case 'not active':
            return notActiveMessage;
        default:
            return allMessage;
    }
}

interface ProfileProductsState {
    loading: boolean,
    products: Array<ProductModelResponse>,
    page?: TabVariant,
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
                return [];
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                // throw statuses.SERVER_MESSAGE;
                return [];
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // throw body.error;
                return [];
            }
        }

        return resp.body ? resp.body : [];
    }

    async getAllProducts() {
        const products = await this.fetchProducts();

        this.setState({
            loading: false,
            products: products,
            page: 'all',
        });
    }

    async getActiveProducts() {
        const products: Array<ProductModelResponse> = await this.fetchProducts();
        const active = products.filter(prod => prod.is_active === true);

        this.setState({
            loading: false,
            products: active,
            page: 'active',
        });
    }

    async getNotActiveProducts() {
        const products: Array<ProductModelResponse> = await this.fetchProducts();
        const notActive = products.filter(prod => prod.is_active === false);

        this.setState({
            loading: false,
            products: notActive,
            page: 'not active',
        });
    }

    removeProduct = (id: number) => {
        const newProducts = this.state.products.filter((product) => product.id !== id);

        this.setState({
            loading: false,
            products: newProducts,
        });
    };

    createContainer() {
        const products: VDomNode[] = [];

        this.state.products.forEach((product: ProductModelResponse) => products.push(
            createComponent(
                Card,
                {
                    variant: 'profile', 
                    ...product, 
                    removeCallback: this.removeProduct,
                    activeCallBack: this.removeProduct,
                }
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
                Text,
                {
                    tag: 'div',
                    variant: 'subheader',
                    text: 'Объявления',
                    style: 'padding-bottom: 32px',
                },
            ),
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
                    { text: getMessage(this.state.page || 'all'), },
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
