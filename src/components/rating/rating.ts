import './rating.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent, VDomNode } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text } from '../baseComponents';

export type RatingVariant = 'edit' | 'show';

const ratingToString = (rating: number) => {
    switch(rating) {
        case 0:
            return 'Не выбрано';
        case 1:
            return 'Очень плохо';
        case 2:
            return 'Плохо';
        case 3:
            return 'Нормально';
        case 4:
            return 'Хорошо';
        case 5:
            return 'Отлично';
        default:
            return 'Отлично';
    }
};

export interface RatingProps {
    variant?: RatingVariant,
    rating?: number,
    textState?: string,
    influenceFunc?: (rating: number) => void,
}

export interface RatingState {
    rating: number,
}

export class Rating extends Component<RatingProps, RatingState> {

    state = {
        rating: 0,
    };

    getStarState(index: number) {
        let rating = this.state.rating;
        if (this.props.rating) {
            rating = Number(this.props.rating);
        }

return createElement(
            'div',
            {
                class: 'rating-box-stars-star',
                onclick: () => {
                    this.setState({ rating: index });
                    if (this.props.influenceFunc) {
                        this.props.influenceFunc(index);
                    }
                },
            },
            createElement(
                'img',
                {
                    src: (index <= rating) ?
                        '../../assets/icons/fillstar.svg'
                        : '../../assets/icons/star.svg',
                },
            ),
        );
    }

    getStars() {
        const result: Array<VDomNode> = [];
        [1, 2, 3, 4, 5].forEach((rating) => {
            result.push(this.getStarState(rating));
        });

        return result;
    }

    getTextClassName() {
        let rating = this.state.rating;
        if (this.props.rating) {
            rating = Number(this.props.rating);
        }
        if (rating < 1 && this.props.textState && this.props.textState == 'error') {
            return ' rating-error';
        }
        if (rating >= 1 && rating < 3) {
            return ' rating-bad';
        }
        if (rating > 3) {
            return ' rating-good';
        }

return ' rating-normal';
    }

    render() {
        const variantClass = this.props.variant ?
            this.props.variant == 'show' ? '-show' : ''
            : '';

        return createElement(
            'div',
            { class: 'rating-box' + variantClass },
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: (variantClass == '') ? 'regular' : 'subheader',
                    text: (variantClass == '') ?
                            ratingToString(this.state.rating)
                            : (this.props.rating || 0.0).toString(),
                    className: 'rating-box-title' + variantClass + this.getTextClassName(),
                },
            ),
            createElement(
                'div',
                { class: 'rating-box-stars' },
                ...this.getStars(),
            ),
        );
    }
}
