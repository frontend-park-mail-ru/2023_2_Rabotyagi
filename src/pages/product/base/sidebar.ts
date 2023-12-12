import './sidebar.scss';
import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, VDomElement, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Button, Svg, Text } from '../../../components/baseComponents/index';
import star from '../../../assets/icons/star.svg';
import delivery from '../../../assets/icons/badges/delivery.svg';
import safeDeal from '../../../assets/icons/badges/safe_deal.svg';
import Navigate from '../../../shared/services/router/Navigate';
import { ProductBase } from './base';
import UserStore from '../../../shared/store/src/user';

interface ProductSidebarProps extends UserModel {
    price: number,
    // callbacks: Callbacks,
    parent: ProductBase
}

export class ProductSidebar extends Component<ProductSidebarProps, never> {
    routeToSaler = () => {
        if (this.props?.id === UserStore.getFields()?.id) {
            Navigate.navigateTo('/profile');
        }
        else {
            Navigate.navigateTo(`/profile/saler?id=${this.props?.id}`, {salerId: this.props?.id});
        }
    };

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
                    text: this.props.price,
                    variant: 'subheader',
                },
            ),
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
            createComponent(
                Button,
                {
                    text: 'В корзину',
                    variant: 'primary',
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
        );
    }
}
