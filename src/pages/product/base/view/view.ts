import { Button, Text } from '../../../../components/baseComponents/index';
import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';
import { ProductModelResponse } from '../../../../shared/models/product';
import fav from '../../../../assets/icons/heart.svg';
import { Carousel } from '../../../../components/carousel/Carousel';
import CityStore from '../../../../shared/store/city';
import CategoryStore from '../../../../shared/store/category';

interface ProductBaseViewProps extends ProductModelResponse {

}

export class ProductBaseView extends Component<ProductBaseViewProps, never> {

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
                        text: 'Добавить в избранное',
                        leftIcon: {
                            width: 24,
                            height: 24,
                            content: fav,
                        },
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
