import { stringToElement } from '../../../shared/utils/parsing';
import template from './dropdown.hbs';
import searchIcon from '../../assets/icons/search.svg';
import './dropdown.scss';

class Dropdown {
    constructor(context) {
        this.context = context;
    }

    render() {
        this.context.searchIcon = searchIcon;
        const root = stringToElement(template(this.context));

        return root;
    }
}

export default Dropdown;
