import { stringToElement } from '../../shared/utils/parsing';
import template from './menu.hbs';

class Menu {
    render(saler) {
        const root = stringToElement(template(saler));

        return root;
    }
}

export default Menu;