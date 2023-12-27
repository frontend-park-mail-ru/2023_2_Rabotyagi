import './carousel.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Button, Image } from '../baseComponents/index';

export interface CarouselProps {
    images: Array<{ url: string }> | undefined | null,
}

export interface CarouselState {
    currentImageIndex: number,
}

export class Carousel extends Component<CarouselProps, CarouselState> {

    state = {
        currentImageIndex: 0,
    };

    imageArrayLength = () => this.props?.images ? this.props.images.length : 0;

    goBack = (e: Event) => {
        e.preventDefault();

        if (this.imageArrayLength() === 0) {
            return;
        }

        let newIndex = this.state.currentImageIndex;
        if (newIndex - 1 < 0) {
            newIndex = this.imageArrayLength() - 1;
        } else {
            newIndex -= 1;
        }

        this.setState({ currentImageIndex: newIndex });
    };

    goNext = (e: Event) => {
        e.preventDefault();

        if (this.imageArrayLength() === 0) {
            return;
        }

        let newIndex = this.state.currentImageIndex;
        if (newIndex + 2 > this.imageArrayLength()) {
            newIndex = 0;
        } else {
            newIndex += 1;
        }

        this.setState({ currentImageIndex: newIndex });
    };

    render() {

        const images = this.props.images;

        const leftBtn = [], rightBtn = [];

        if (images && images.length > 1) {
            leftBtn.push(
                createComponent(
                    Button,
                    {
                        className: 'carousel-button--left',
                        onclick: this.goBack,
                    },
                    createElement(
                        'span',
                        {},
                    ),
                ),
            );

            rightBtn.push(
                createComponent(
                    Button,
                    {
                        className: 'carousel-button--right',
                        onclick: this.goNext,
                    },
                    createElement(
                        'span',
                        {},
                    ),
                ),
            );
        }

        return createElement(
            'div',
            { class: 'carousel' },
            ...leftBtn,
            (images) ?
            createComponent(
                Image,
                {
                    class: 'carousel-item',
                    src: images[this.state.currentImageIndex].url,
                },
            ) :
            createElement(
                'div', { class: 'carousel-empty placeholder' },
            ),
            ...rightBtn,
        );
    }
}
