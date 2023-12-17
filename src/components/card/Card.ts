import './cardStyles/card.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomNode, createComponent, createElement, createText } from '../baseComponents/snail/vdom/VirtualDOM';

import { Badge } from './badge/Badge';
import { Text, Button, Image } from '../baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import delivery from '../../assets/icons/badges/delivery.svg';
import safeDeal from '../../assets/icons/badges/safe_deal.svg';
import { UserApi } from '../../shared/api/user';
import { ResponseStatusChecker } from '../../shared/constants/response';
import { Product } from '../../shared/api/product';

export type CardVariants = 'base' | 'profile' | 'profile-saler' | 'favourite' | 'cart';

export interface ImageProps {
    url: string
}

export interface CardProps {
    id: number,
    class?: string,
    name?: string,
    style?: string,
    variant?: CardVariants,
    images?: Array<ImageProps>,
    title: string,
    price: number,
    delivery?: boolean,
    safe_deal?: boolean,
    city?: string,
    isActive?: boolean,
    favouriteInfluence?: (index: number) => void,
}

enum MouseButtons {
    LEFT = 0,
    WHEEL = 1,
    RIGHT = 2
}

export class Card extends Component<CardProps, {}> {

    navigateToProduct = (e: MouseEvent) => {
        switch (e.button) {
            case MouseButtons.LEFT:
                if (e.ctrlKey){
                    window.open(`/product?id=${this.props?.id}`, '_blank');

                    return;
                }

                Navigate.navigateTo(`/product?id=${this.props?.id}`, { productId: this.props?.id });
                break;

            case MouseButtons.WHEEL:
                window.open(`/product?id=${this.props?.id}`, '_blank');
                break;
        }
    };

    thisHaveBadges() {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        return this.props.delivery || this.props.safe_deal || this.props.city;
    }

    renderBadges(badgeClass: string) {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        const badges: Array<VDomNode> = [];

        if (this.props.delivery) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, svgIcon: delivery },
            ));
        }
        if (this.props.safe_deal) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, svgIcon: safeDeal },
            ));
        }
        if (this.props.city) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, text: this.props.city },
            ));
        }

        return badges;
    }

    renderBase() {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        // const id = this.props.id;

        return createElement(
            'button',
            {
                class: 'card-base',
                onmouseup: this.navigateToProduct,
            },
            createElement(
                'div',
                { class: 'badges-base' },
                ...this.renderBadges('badge-base'),
            ),
            createElement(
                'div',
                { class: 'body-base' },
                (this.props.images) ?
                    createComponent(
                        Image,
                        {
                            class: 'image-base',
                            src: this.props.images[0].url,
                        },
                    )
                    // createElement(
                    //     'img',
                    //     { class: 'image-base', src: getResourceUrl(this.props.images[0].url) as string },
                    // )
                    :
                    createElement(
                        'div',
                        { class: 'image-base' },
                    ),
                createElement(
                    'div',
                    { class: 'info-base' },
                    createComponent(
                        Text, { text: this.props.price.toString() + ' ₽' },
                    ),
                    createComponent(
                        Text, { text: this.props.title, className: 'title-base' },
                    ),
                ),
            ),
        );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeActiveStatus = (e: Event) => {
        e.stopPropagation();
    };

    renderActiveButton() {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        const isActive = this.props.isActive || false;

        return createComponent(
            Button,
            {
                variant: 'primary',
                text: (isActive) ? 'Деактивировать' : 'Активировать',
                style: 'width: 100%;',
                onclick: this.changeActiveStatus,
            },
        );
    }

    deleteProduct = async(e: Event) => {
        e.stopPropagation();

        if (this.props) {
            let res;

            try {
                res = await Product.delete(this.props.id);
            }
            catch(err) {
                console.error(err);

                return;
            }

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                return;
            }

            // this.props.favouriteInfluence(this.props.id);
        }
    };

    deleteFavourite = async(e: Event) => {
        if (!this.props || !this.props.favouriteInfluence) {
            throw new Error('Favourite card props are undefined');
        }

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

            this.props.favouriteInfluence(this.props.id);

            /*Dispatcher.dispatch({
                name: 'FAVOURITE_REMOVE',
                payload: this.props.id,
            });*/

            //this.unmount();
        }
    };

    deleteFunction = (e: Event) => {
        e.stopPropagation();

        switch (this.props?.variant as CardVariants) {
            case 'base':
                break;

            case 'cart':
                break;

            case 'favourite':
                this.deleteFavourite(e);
                break;

            case 'profile':
                this.deleteProduct(e);
                break;
        }
    };

    renderProfile() {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        const variant = this.props.variant || 'profile';

        return createElement(
            'button',
            {
                class: 'card-profile',
                onmouseup: this.navigateToProduct,
            },
            (this.props.images) ?
                createElement(
                    'img',
                    { class: 'image-profile', src: this.props.images[0].url },
                ) :
                createElement(
                    'div',
                    { class: 'image-profile' },
                ),
            createElement(
                'div',
                { class: 'content-profile' },
                createComponent(
                    Text, { text: this.props.price.toString() + ' ₽' },
                ),
                createComponent(
                    Text, { text: this.props.title, className: 'title-profile' },
                ),
                createElement(
                    'div',
                    { class: 'divider' },
                ),
                (this.thisHaveBadges()) ?
                    createElement(
                        'div',
                        { class: 'badges-profile' },
                        ...this.renderBadges('badge-profile'),
                    ) : createText(''),
                (variant == 'profile') ?
                    this.renderActiveButton()
                    : createText(''),
                (variant == 'profile' || variant == 'favourite') ?
                    createComponent(
                        Button,
                        {
                            variant: 'outlined',
                            text: 'Удалить',
                            style: 'width: 100%;',
                            onmouseup: this.deleteFunction,
                        },
                    ) : createText(''),
            ),
        );
    }

    renderCart() {

    }

    render() {
        if (!this.props) {
            throw new Error('Card props are undefined');
        }

        switch(this.props.variant) {
            case 'base':
                return this.renderBase();
            case 'profile':
                return this.renderProfile();
            case 'profile-saler':
                return this.renderProfile(); // renderProfile имеет внутренние проверки для случая чужой карточки
            case 'favourite':
                return this.renderProfile(); // renderProfile имеет внутренние проверки для случая карточки внутри изрбанного
            default:
                return this.renderBase();
        }
    }
}
