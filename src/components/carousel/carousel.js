import { stringToElement } from '../../shared/utils/parsing';
import button from '../button/button';
import template from './carousel.hbs';
import './carousel.scss';

export class Carousel {
    images;
    currentImageIndex;

    constructor(images) {
        let index = 0;
        images = images.map((value) => {
            value.id = index;
            index++;
            return value;
        })
        this.images = images;
        this.currentImageIndex = 0;
    }

    async preRender() {
        this.root = stringToElement(template(this.images));
        const images = this.root.querySelectorAll('img[data-id]');
        if (images.length > 1) {
            images.forEach((item) => item.style.display = 'none');

            const btnPrev = button({
                variant: 'outlined',
                text: {
                    class: 'text-regular',
                    content: '<',
                }
            });

            const btnNext = button({
                variant: 'outlined',
                text: {
                    class: 'text-regular',
                    content: '>',
                }
            });

            this.root.querySelector('#selectPrev').replaceWith(btnPrev);
            this.root.querySelector('#selectNext').replaceWith(btnNext);
    
            btnPrev.addEventListener('click', () => {
                images[ this.currentImageIndex ].style.display = 'none';
                if (this.currentImageIndex - 1 < 0){
                    this.currentImageIndex = images.length - 1;
                }
                else {
                    this.currentImageIndex--;
                }
                images[ this.currentImageIndex ].style.display = 'flex';
            });
    
            btnNext.addEventListener('click', () => {
                images[ this.currentImageIndex ].style.display = 'none';
                if (this.currentImageIndex + 1 >= images.length){
                    this.currentImageIndex = 0;
                }
                else {
                    this.currentImageIndex++;
                }
                images[ this.currentImageIndex ].style.display = 'flex';
            });
    
            images[ 0 ].style.display = 'flex';
        }
    }

    render() {
        this.preRender();
        return this.root;
    }
}