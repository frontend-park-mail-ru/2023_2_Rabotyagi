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

    goBack(imageArrayLength: number | undefined) {
        if (!imageArrayLength) {
            return;
        }

        let newIndex = this.state.currentImageIndex;
        if (newIndex - 1 < 0) {
            newIndex = imageArrayLength - 1;
        } else {
            newIndex -= 1;
        }

        this.setState({ currentImageIndex: newIndex, });
    }

    goNext(imageArrayLength: number | undefined) {
        if (!imageArrayLength) {
            return;
        }

        let newIndex = this.state.currentImageIndex;
        if (newIndex + 1 > imageArrayLength) {
            newIndex = 0;
        } else {
            newIndex += 1;
        }

        this.setState({ currentImageIndex: newIndex, });
    }

    render() {
        if (!this.props) {
            throw new Error('Carousel settings are undefined');
        }

        const images = this.props.images;

        return createElement(
            'div',
            { class: 'carousel' },
            createComponent(
                Button, 
                {
                    variant: 'outlined',
                    text: '<',
                    onclick: () => { this.goBack(images ? images.length : undefined); },
                }
            ),
            (images) ?
                createComponent(
                    Image,
                    { 
                        class: 'carousel_item',
                        src: images[this.state.currentImageIndex].url,
                    }
                ) :
                createElement(
                    'div', { class: 'carousel_empty placeholder', }
                ),
            createComponent(
                Button,
                {
                    variant: 'outlined',
                    text: '>',
                    onclick: () => { this.goNext(images ? images.length : undefined); },
                }
            )
        )
    };
}