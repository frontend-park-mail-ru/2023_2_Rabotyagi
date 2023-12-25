import './cardStyles/card.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomComponent, VDomNode, createComponent, createElement, createText } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text, Button, Image, Select } from '../baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import { UserApi } from '../../shared/api/user';
import { ProductApi } from '../../shared/api/product';
import { PremiumApi } from '../../shared/api/premium';
import { ResponseStatusChecker } from '../../shared/constants/response';

import { Modal } from '../modal/modal';

import { PremiumPeriods, premiumPeriodsList } from '../../shared/models/premium';

import delivery from '../../assets/icons/badges/delivery.svg';
import safeDeal from '../../assets/icons/badges/safe_deal.svg';
import { Badge } from './badge/Badge';

export type CardVariants = 'base' | 'profile' | 'profile-saler' | 'favourite';

export interface ImageProps {
    url: string
}

export interface BaseCardProps {
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
    is_active?: boolean,
    in_favourites?: boolean,
    premium: boolean,
}

export interface FavouriteCardProps extends BaseCardProps {
    favouriteInfluence?: (index: number) => void,
}

export interface CartCardProps extends BaseCardProps {
    product_id: number,
    saler_id: number,
    owner_id: number,
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
    is_active?: boolean,
    premium: boolean,
    favouriteInfluence?: (index: number) => void,
    removeCallback?: (id: number) => void
}

enum MouseButtons {
    LEFT = 0,
    WHEEL = 1,
    RIGHT = 2
}

interface CardState {
    isActive?: boolean,
    modalActive?: VDomComponent,
}

export class Card extends Component<CardProps, CardState> {
    protected state: CardState = {
        isActive: false,
    };

    public componentDidMount(): void {
        this.setState({
            isActive: this.props?.is_active || false,
        });
    }

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

    thisHaveBadges = () => this.props.delivery || this.props.safe_deal || this.props.city;

    renderBadges(badgeClass: string) {
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

        return createElement(
            'button',
            {
                class: `card-base${(this.props.premium ? '--premium' : '')}`,
                onclick: this.navigateToProduct,
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
                    :
                    createElement(
                        'div',
                        { class: 'image-base' },
                    ),
                createElement(
                    'div',
                    { class: 'info-base' },
                    createComponent(
                        Text, { text: this.props.price, type: 'price' },
                    ),
                    createComponent(
                        Text, { text: this.props.title, className: 'title-base' },
                    ),
                ),
            ),
        );
    }

    renderActiveButton() {

        const cp = this; // eslint-disable-line

        const changeActiveStatus = async(e: Event) => {
            e.stopPropagation();

            let res;

            try {
                res = await ProductApi.changeActive(this.props.id, !this.state.isActive);
            }
            catch (err) {
                console.error(err);
            }

            if (!ResponseStatusChecker.IsRedirectResponse(res)) {
                return;
            }

            cp.setState({
                isActive: !this.state.isActive,
            });

        };

        return createComponent(
            Button,
            {
                variant: 'primary',
                text: (this.state.isActive) ? 'Деактивировать' : 'Активировать',
                style: 'width: 100%;',
                onclick: changeActiveStatus,
            },
        );
    }

    renderPromoteButton() {

        const promoteEvent = (e: Event) => {
            e.stopPropagation();
            let period: PremiumPeriods = PremiumPeriods.Year;

            if (this.state.modalActive) {
                return;
            }

            const accept = async() => {
                if (this.props) {
                    let res;

                    try {
                        res = await PremiumApi.add(this.props.id, period);
                    }
                    catch(err){
                        console.error(err);

                        return;
                    }

                    if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                        return;
                    }

                    // @FIX
                    Navigate.navigateTo('/profile/orders');
                    Navigate.navigateTo('/profile/products');
                }

            };

            const deny = () => this.setState({modalActive: undefined});

            const chooseValue = (e: Event) => {
                const select = (e.currentTarget as HTMLSelectElement);
                period = Number(select.value);
            };

            const modal = createComponent(
                Modal,
                {
                    onAccept: accept,
                    onDeny: deny,
                },
                createComponent(
                    Select,
                    {
                        items: premiumPeriodsList,
                        key: 'value',
                        value: 'name',
                        events: {
                            onchange: chooseValue,
                        },
                    },
                ),
            );
            this.setState({
                modalActive: modal,
            });
        };

        return createComponent(
            Button,
            {
                variant: (this.props.premium) ? 'secondary' : 'primary',
                text: (this.props.premium) ? 'Продвижение активно' : 'Платное продвижение',
                style: 'width: 100%;',
                disabled: this.props.premium,
                onclick: promoteEvent,
            },
        );
    }

    deleteProduct = async(e: Event) => {
        e.stopPropagation();

        if (this.props) {
            let res;

            try {
                res = await ProductApi.delete(this.props.id);
            }
            catch(err) {
                console.error(err);

                return;
            }

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                return;
            }

            if (this.props.removeCallback){
                this.props.removeCallback(this.props.id);
            }
        }
    };

    deleteFavourite = async(e: Event) => {
        if (!this.props.favouriteInfluence) {
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
        }
    };

    deleteFunction = (e: Event) => {
        e.stopPropagation();

        switch (this.props?.variant as CardVariants) {
            case 'base':
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

        const modal: Array<VDomComponent> = [];

        if (this.state.modalActive) {
            modal.push(this.state.modalActive);
        }

        const variant = this.props.variant || 'profile';

        return createElement(
            'card',
            {},
            ...modal,
            createElement(
                'button',
                {
                    class: `card-profile${this.props.premium ? '--premium' : ''}`,
                    onclick: this.navigateToProduct,
                },
                (this.props.images) ?
                    createComponent(
                        Image,
                        {
                            class: 'image-profile',
                            src: this.props.images[0].url,
                        },
                    )
                    :
                    createElement(
                        'div',
                        { class: 'image-profile' },
                    ),
                createElement(
                    'div',
                    { class: 'content-profile' },
                    createComponent(
                        Text, { text: this.props.price, type: 'price' },
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
                        ) :
                        createElement(
                            'div',
                            { class: 'badges-profile' },
                        ),
                    (variant == 'profile') ?
                        this.renderActiveButton()
                        : createText(''),
                    (variant == 'profile') ?
                        this.renderPromoteButton()
                        : createText(''),
                    (variant == 'profile' || variant == 'favourite') ?
                        createComponent(
                            Button,
                            {
                                variant: 'accent',
                                text: 'Удалить',
                                style: 'width: 100%;',
                                onclick: this.deleteFunction,
                            },
                        ) : createText(''),
                ),
            ),
        );
    }

    renderCart() {

    }

    render() {

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
