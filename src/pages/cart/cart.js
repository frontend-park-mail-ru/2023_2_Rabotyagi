import template from './cart.hbs';
import './cart.scss';

import { store } from '../../shared/store/store.js';

import { Header } from '../../components/header/header.js';
import { OrderFeed } from '../../components/orderFeed/orderFeed.js';

import { stringToElement } from '../../shared/utils/parsing.js';

class Cart {
    render() {
        const context = {
            pageTitle: 'Корзина',
            authorized: store.user.isAuth(),
        };
        const header = new Header().render();
        const feed = new OrderFeed();

        const root = stringToElement(template(context));
        root.querySelector('#cartContent').replaceWith(feed.render());

        return [ header, root ];
    }
}

export default Cart;
