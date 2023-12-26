import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Button, Text } from '../../../../components/baseComponents/index';

import { UserApi } from '../../../../shared/api/user';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

import { getRuFormat } from '../../../../shared/utils/dateConverter';

import CityStore from '../../../../shared/store/city';
import CategoryStore from '../../../../shared/store/category';
import FavouriteStore from '../../../../shared/store/favourite';
import UserStore from '../../../../shared/store/user';
import Dispatcher from '../../../../shared/services/store/Dispatcher';

import { Carousel } from '../../../../components/carousel/Carousel';

import fav from '../../../../assets/icons/heart.svg';

interface ProductBaseViewProps extends ProductModelResponse { }

interface ProductBaseViewState {
    inFav: boolean,
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

    public componentDidMount(): void {
        if (this.props) {
            this.setState({
                inFav: FavouriteStore.getById(this.props.id) ? true : false,
            });
        }
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
                payload: this.props.id,
            });

            this.setState({inFav: true});
        }

    };

    render() {

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
                (!UserStore.isSameUser(this.props.saler_id)) ?
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
                    ) : createText(''),
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
                            text: getRuFormat(this.props.created_at),
                        },
                    ),
                ),
            ),
        );
    }
}
