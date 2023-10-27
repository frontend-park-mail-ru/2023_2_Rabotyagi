import styles from './breadcrumb.scss' // eslint-disable-line no-unused-vars
import template from './breadcrumb.hbs'
import { stringToElement } from '../../shared/utils/parsing';

class Breadcrumb {
    constructor(items){
        this.items = items;
    }

    render() {
        for (let index = 1; index < this.items.length; index = index*2 + 1) {
            this.items.splice(index, 0, { text: "·", isDelimiter: true });
        }

        const context = {
            items: this.items,
        };
        const root = stringToElement(template(context));

        this.items.forEach(element => {
            if (!element.isDelimiter && element.delegate) {
                element.delegate(root);
            }
        });

        return root;
    }
}

export default Breadcrumb;