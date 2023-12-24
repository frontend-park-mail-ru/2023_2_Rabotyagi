import './rating.scss';

import { Component } from '../baseComponents/snail/component';
import { createElement, createComponent, VDomNode } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text } from '../baseComponents';

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
}

export interface RatingProps {
    influenceFunc: (rating: number) => void,
}

export interface RatingState {
    rating: number,
}

export class Rating extends Component<RatingProps, RatingState> {

    state = {
        rating: 0,
    }

    getStarState(index: number) {
        return createElement(
            'div',
            { 
                class: 'rating-box-stars-star', 
                onclick: () => {
                    this.setState({ rating: index, });
                    this.props.influenceFunc(index);
                },
            },
            createElement(
                'img',
                {
                    src: (index <= this.state.rating) ? 
                        '../../assets/icons/fillstar.svg' 
                        : '../../assets/icons/star.svg',
                },
            ),
        );
    }

    getStars() {
        let result: Array<VDomNode> = [];
        [1, 2, 3, 4, 5].forEach((rating) => {
            result.push(this.getStarState(rating));
        });

        return result;
    }

    render() {
        return createElement(
            'div',
            { class: 'rating-box', },
            createComponent(
                Text,
                {
                    tag: 'div',
                    text: ratingToString(this.state.rating),
                    className: 'rating-box-title',
                }
            ),
            createElement(
                'div',
                { class: 'rating-box-stars', },
                ...this.getStars(),
            )
        )
    }
}