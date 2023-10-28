import { stringToElement } from '../../../shared/utils/parsing';
import template from './products.hbs';

class Products {
    constructor() {

    }


    render() {
        return stringToElement(template());
    }
}

export default Products;