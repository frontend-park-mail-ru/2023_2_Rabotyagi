import { stringToElement } from '../../../shared/utils/parsing';
import template from './products.hbs';
import './products.scss';

class Products {
    constructor() {

    }


    render() {
        const root = stringToElement(template())

        root.querySelectorAll('.tab').forEach((value) => {
            value.addEventListener('click', (e) => {
                if (this.selected != null) {
                        this.selected.classList.toggle('selected');
                }

                e.currentTarget.classList.toggle('selected');
                this.selected = e.currentTarget;
            });
        })

        return root;
    }
}

export default Products;