import { stringToElement } from '../../shared/utils/parsing.js';
import template from './cart.hbs';
import './cart.scss';
import { Header } from '../../components/header/header.js';
import { OrderFeed } from '../../components/orderFeed/orderFeed.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
// import uid from '../../shared/utils/uid.js';

class Cart {
    render() {
        const context = {
            pageTitle: 'Корзина',
            authorized: store.user.isAuth(),
        };
        const header = new Header();
        const feed = new OrderFeed();

        const root = stringToElement(template(context));
        root.querySelector('#header').replaceWith(header.render());
        root.querySelector('#cartContent').replaceWith(feed.render());
                    
        return root;
    }
}

export default Cart;