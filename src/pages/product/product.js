import { Header } from "../../components/header/header";
import { stringToElement } from "../../shared/utils/parsing";
import template from './product.hbs';
import './product.scss';

class Product {
    constructor() {

    }

    render(){
        const context = {
            
        }

        const root = stringToElement(template(context));
        const header = new Header();

        root.querySelector('#header').replaceWith(header.render());

        return root;
    }
}

export default Product;