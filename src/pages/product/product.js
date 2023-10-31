import { stringToElement } from '../../shared/utils/parsing.js';
import template from './product.hbs';
import './product.scss';
import { Header } from '../../components/header/header.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
// import uid from '../../shared/utils/uid.js';

class Product {
    constructor() {
        this.selected = null;
    }

    render() {
        const context = {
            product: "product",
        };
        const header = new Header();

        const root = stringToElement(template(context));
        root.querySelector('#header').replaceWith(header.render());
                    
        return root;
    }
}

export default Product;