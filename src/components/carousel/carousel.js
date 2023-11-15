import { stringToElement } from '../../shared/utils/parsing';
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
        images.forEach((item) => item.style.display = 'none');

        this.root.querySelector('button[name="selectPrev"]').addEventListener('click', (e) => {
            images[ this.currentImageIndex ].style.display = 'none';
            if (this.currentImageIndex - 1 < 0){
                this.currentImageIndex = images.length - 1;
            }
            else {
                this.currentImageIndex--;
            }
            images[ this.currentImageIndex ].style.display = 'flex';
        });

        this.root.querySelector('button[name="selectNext"]').addEventListener('click', (e) => {
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
        // this.root.querySelectorAll('img[data-id]').forEach((elem) => {
        //     debugger
        // })
    }

    render() {
        this.preRender();
        return this.root;
    }
}