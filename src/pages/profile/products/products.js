import { stringToElement } from '../../../shared/utils/parsing';
import template from './products.hbs';
import styles from './products.scss'; // eslint-disable-line no-unused-vars

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