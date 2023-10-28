import { stringToElement } from '../../../shared/utils/parsing';
import template from './favourite.hbs';

class Favourite {
    constructor() {

    }


    render() {
        return stringToElement(template());
    }
}

export default Favourite;