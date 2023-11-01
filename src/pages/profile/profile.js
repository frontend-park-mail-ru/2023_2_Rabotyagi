import { stringToElement } from '../../shared/utils/parsing.js';
import template from './profile.hbs';
import './profile.scss';
import { Header } from '../../components/header/header.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
// import uid from '../../shared/utils/uid.js';
import { Router, Route } from '../../shared/services/router.js';
import Orders from './orders/orders.js';
import Products from './products/products.js';
import Favourite from './favourite/favourite.js';
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import listIcon from '../../assets/icons/list-ad.svg';
import cartIcon from '../../assets/icons/cart.svg';
import heartIcon from '../../assets/icons/heart.svg';

class Profile {
    activePage;

    constructor() {
        this.activePage = null;
    }

    render() {
        const context = {
            user: store.user.state.fields
        };
        const header = new Header();

        const root = stringToElement(template(context));
        root.querySelector('#header').replaceWith(header.render());
        const content = root.querySelector('.content');

        this.router = new Router([
            new Route(new RegExp('^/profile/products$'), new Products(this)),
            new Route(new RegExp('^/profile/orders$'), new Orders()),
            new Route(new RegExp('^/profile/favourites$'), new Favourite()),
        ], content);

        root.querySelector('#btn-products')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои объявления'
            },
            link: '/profile/products',
            leftIcon: svg({ content: listIcon , width: 20, height: 20 })
        }));

        root.querySelector('#btn-orders')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои заказы'
            },
            link: '/profile/orders',
            leftIcon: svg({ content: cartIcon, width: 20, height: 20 })
        }));

        root.querySelector('#btn-favorite')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Закладки'
            },
            link: '/profile/favourites',
            leftIcon: svg({ content: heartIcon, width: 20, height: 20 })
        }));

        root.querySelectorAll('button[data-link]').forEach(item => 
            
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (item.dataset.link !== location.pathname) {
                    this.router.navigateTo(item.dataset.link);
                }
            }, { capture: false })
        );

                    
        return root;
    }
}

export default Profile;