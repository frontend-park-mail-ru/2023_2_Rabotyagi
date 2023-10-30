import './card.scss';
import template from './card.hbs';
import { stringToElement } from '../../shared/utils/parsing';

class Card {
    constructor(context){
        this.context = context;
    }

    render() {
        const root = stringToElement(template(context));
        
        return root;
    }
}