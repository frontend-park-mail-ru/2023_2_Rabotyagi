import { Button, Text } from '../../../../components/baseComponents/index';
import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';
import { ProductModelResponse } from '../../../../shared/models/product';
import fav from '../../../../assets/icons/heart.svg';
import { Carousel } from '../../../../components/carousel/Carousel';
import CityStore from '../../../../shared/store/city';
import CategoryStore from '../../../../shared/store/category';
import FavouriteStore from '../../../../shared/store/favourite';
import { UserApi } from '../../../../shared/api/user';
import Dispatcher from '../../../../shared/services/store/Dispatcher';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

interface ProductBaseViewProps extends ProductModelResponse {

}

interface ProductBaseViewState {

    inFav: boolean
}

export class ProductBaseView extends Component<ProductBaseViewProps, ProductBaseViewState> {

    protected state: ProductBaseViewState = {
        inFav: FavouriteStore.getById(
            Number((new URLSearchParams(location.search)).get('id')),
        ) ? true : false,
    };

    listener = () => {
        if (this.props) {
            this.setState({
                inFav: FavouriteStore.getById(this.props.id) ? true : false,
            });
        }
    };

    constructor() {
        super();

        FavouriteStore.addStoreUpdater(this.listener);
    }

    removeFromFav = async(e: Event) => {
        e.stopPropagation();

        if (this.props) {

            let res;

            try {
                res = await UserApi.removeFromFav(this.props.id);
            }
            catch(err) {
                console.error(err);

                return;
            }

            if (!ResponseStatusChecker.IsRedirectResponse(res)) {
                return;
            }

            Dispatcher.dispatch({
                name: 'FAVOURITE_REMOVE',
                payload: this.props.id,
            });

            this.setState({inFav: false});
        }
    };

    addToFav = async(e: Event) => {
        e.stopPropagation();

        if (this.props) {
            let res;

            try {
                res = await UserApi.addToFav(this.props.id);
            }
            catch(err) {
                console.error(err);

                return;
            }

            if (!ResponseStatusChecker.IsRedirectResponse(res)) {
                return;
            }

            Dispatcher.dispatch({
                name: 'FAVOURITE_ADD',
                payload: res.body.id,
            });

            this.setState({inFav: true});
        }

    };

    public render() {
        if (!this.props) {
            throw new Error('ProductBaseView props undefined');
        }

        const city = CityStore.getById(this.props.city_id);
        const category = CategoryStore.getById(this.props.category_id);

        return createElement(
            'content',
            {
                class: 'product-content',
            },
            createElement(
                'div',
                {
                    class: 'product-content-header',
                },
                createComponent(
                    Text,
                    {
                        className: 'product-content-header-title',
                        text: this.props.title,
                        variant: 'subheader',
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: this.state?.inFav ? 'В избранном' : 'Добавить в избранное',
                        leftIcon: {
                            width: 24,
                            height: 24,
                            content: fav,
                        },
                        onclick: this.state?.inFav ? this.removeFromFav : this.addToFav,
                        variant: 'outlined',
                    },
                ),
            ),
            createElement(
                'div',
                {
                    class: 'product-content-body',
                },
                createComponent(
                    Carousel,
                    {
                        images: this.props.images,
                    },
                ),
                createElement(
                    'div',
                    {
                        class: 'product-content-body-info',
                    },
                    createComponent(
                        Text,
                        {
                            text: 'Город',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: city ? city.name : this.props.city_id,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Описание',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: this.props.description,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Категория',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: category ? category.name : this.props.category_id,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Просмотрено',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: this.props.views,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Размещено',
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: this.props.created_at,
                        },
                    ),
                ),
            ),
        );
    }
}