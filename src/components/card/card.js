import { stringToElement } from '../../shared/utils/parsing.js';
import './card.scss'
import Handlebars from 'handlebars/runtime';
import Template from './card.hbs'

export class Card {
    constructor(context) {
        this.context = context;
    }

    render() {
        Handlebars.registerHelper('isdefault', function () {
            return this.variant !== undefined;
        });

        Handlebars.registerHelper('isprofile', function (value) {
            return value === 'profile';
        });

        Handlebars.registerHelper('haveBadges', function () {
            return (this.safeDeal || this.delivery);
        });

        const template = Template;
        
        const root = stringToElement(template(this.context));

        root.addEventListener('click', (e) => {
            e.stopPropagation();
            
            window.Router.navigateTo('/product', { productId: this.context.id })
        })

        return root;
    }
}
