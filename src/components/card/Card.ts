import './cardStyles/card.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomNode, createComponent, createElement, createText } from '../baseComponents/snail/vdom/VirtualDOM';

import { Badge } from './Badge/Badge';
import { Text } from '../baseComponents/index';

import delivery from '../../assets/icons/badges/delivery.svg';
import safe_deal from '../../assets/icons/badges/safe_deal.svg';

export type CardVariants = 'base' | 'profile' | 'profile-saler' | 'favourite' | 'cart';

export interface ImageProps {
    url: string
};

export interface CardProps {
    id?: string,
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
};

export class Card extends Component<CardProps, {}> {

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

        return createElement(
            'button',
            { class: 'card-base' },
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

    renderProfile() {

    };

    renderCart() {

    };

    render() {
        if (!this.props) {
            throw new Error('Card settings are undefined');
        }

        return this.renderBase();
    };
};