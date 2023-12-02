import './cardStyles/card.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomNode, createComponent, createElement, createText } from '../baseComponents/snail/vdom/VirtualDOM';

import { Badge } from './Badge/Badge';
import { Text, Button } from '../baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import delivery from '../../assets/icons/badges/delivery.svg';
import safe_deal from '../../assets/icons/badges/safe_deal.svg';

export type CardVariants = 'base' | 'profile' | 'profile-saler' | 'favourite' | 'cart';

export interface ImageProps {
    url: string
};

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
    is_active?: boolean
};

export class Card extends Component<CardProps, {}> {

    navigateToProduct(id: number) {
        Navigate.navigateTo('/product', { productId: id });
    };

    thisHaveBadges() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        };

        return this.props.delivery || this.props.safe_deal || this.props.city;
    };

    renderBadges(badgeClass: string) {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        };
        
        let badges: Array<VDomNode> = [];

        if (this.props.delivery) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, svgIcon: delivery }
            ));
        };
        if (this.props.safe_deal) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, svgIcon: safe_deal }
            ));
        };
        if (this.props.city) {
            badges.push(createComponent(
                Badge,
                { class: badgeClass, text: this.props.city }
            ));
        };

        return badges;
    }

    renderBase() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        };

        const id = this.props.id;

        return createElement(
            'button',
            { class: 'card-base', onclick: () => { this.navigateToProduct(id) } },
            createElement(
                'div',
                { class: 'badges-base' },
                ...this.renderBadges('badge-base')
            ),
            createElement(
                'div',
                { class: 'body-base' },
                (this.props.images) ?
                    createElement(
                        'img',
                        { class: 'image-base', src: this.props.images[0].url }
                    ) : 
                    createElement(
                        'div',
                        { class: 'image-base' }
                    ),
                createElement(
                    'div',
                    { class: 'info-base' },
                    createComponent(
                        Text, { text: this.props.price.toString() + ' ₽' }
                    ),
                    createComponent(
                        Text, { text: this.props.title, additionalClass: 'title-base' }
                    )
                )
            )
        );
    };

    changeActiveStatus(is_active: boolean) {

    };

    renderActiveButton() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        };

        const is_active = this.props.is_active || false;
        
        return createComponent(
            Button, 
            {
                variant: 'primary',
                text: (is_active) ? 'Деактивировать' : 'Активировать',    
                style: 'width: 100%;',
                onclick: () => { this.changeActiveStatus(is_active) } 
            }
        );
    };

    deleteFunction(variant: CardVariants) {
        if (variant == 'profile') {

        } else if (variant == 'favourite') {
            
        };
    };

    renderProfile() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        };

        const variant = this.props.variant || 'profile';

        return createElement(
            'div',
            { class: 'card-profile' },
            (this.props.images) ?
                createElement(
                    'img',
                    { class: 'image-profile', src: this.props.images[0].url }
                ) : 
                createElement(
                    'div',
                    { class: 'image-profile' }
                ),
            createElement(
                'div',
                { class: 'content-profile' },
                createComponent(
                    Text, { text: this.props.price.toString() + ' ₽' }
                ),
                createComponent(
                    Text, { text: this.props.title, additionalClass: 'title-profile' }
                ),
                createElement(
                    'div',
                    { class: 'divider' }
                ),
                (this.thisHaveBadges()) ? 
                    createElement(
                        'div',
                        { class: 'badges-profile' },
                        ...this.renderBadges('badge-profile')
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
                            onclick: () => { this.deleteFunction(variant) }
                        }
                    ) : createText('')        
            )
        );
    };

    renderCart() {

    };

    render() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
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
        };
    };
};