import { stringToElement } from '../../../shared/utils/parsing';
import template from './favourite.hbs';

class Favourite {
    constructor() {

    }


    render() {
        const root = stringToElement(template());

        return [ root ];
    }
}

export default Favourite;