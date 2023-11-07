import { stringToElement } from '../../shared/utils/parsing.js';
import './card.scss'
import Handlebars from 'handlebars/runtime';
import template from './card.hbs'

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
            return (this.safe_deal || this.delivery);
        });
        
        this.context.image = this.context.images[ 0 ].url;
        const root = stringToElement(template(this.context));

        root.addEventListener('click', (e) => {
            e.stopPropagation();
            
            window.Router.navigateTo('/product', { productId: this.context.id })
        })

        return root;
    }
}
