import { stringToElement } from '../../shared/utils/parsing';
import template from './content.hbs';

class Content {
    render(context) {
        const root = stringToElement(template(context));

        return root;
    }
}

export default Content;