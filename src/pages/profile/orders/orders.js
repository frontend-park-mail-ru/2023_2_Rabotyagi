import { stringToElement } from '../../../shared/utils/parsing';
import template from './orders.hbs';

class Orders {
    constructor() {

    }


    render() {
        return stringToElement(template());
    }
}

export default Orders;