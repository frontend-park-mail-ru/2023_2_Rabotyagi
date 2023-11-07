import { stringToElement } from '../../../shared/utils/parsing';
import template from './orders.hbs';

class Orders {
    constructor() {

    }


    render() {
        const root = stringToElement(template());
        return [ root ];
    }
}

export default Orders;