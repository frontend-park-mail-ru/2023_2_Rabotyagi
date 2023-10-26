import { stringToElement } from '../../shared/utils/parsing';
import template from './dropdown.hbs';
import searchIcon from './search.svg'

class Dropdown {
    constructor(context) {
        this.context = context;
    }

    render() {

        this.context.searchIcon = searchIcon.stringify();
        const root = stringToElement(template(this.context));
        return root;
    }
};

export default Dropdown;