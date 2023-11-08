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
// import Favourite from './favourite/favourite.js';
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import listIcon from '../../assets/icons/list-ad.svg';
import cartIcon from '../../assets/icons/cart.svg';
// import heartIcon from '../../assets/icons/heart.svg';
import settingsIcon from '../../assets/icons/settings.svg'
import Settings from './settings/settings.js';
import { UserApi } from '../../shared/api/user.js';

class Profile {
    activePage;

    constructor() {
        this.activePage = null;
    }

    async getProfile(id) {
        return await UserApi.getProfile(id);
    }

    async renderRoot(root) {
        const res = await this.getProfile(store.user.state.fields.userID);
        const { name, phone } = res.body;

        store.user.state.fields = {
            ...store.user.state.fields,
            name: name,
            phone: phone
        };
        const container = stringToElement(template(store.user.state.fields));
        root.replaceWith(container);
        const content = container.querySelector('.content');

        this.router = new Router([
            new Route(new RegExp('^/profile/products$'), new Products(this)),
            new Route(new RegExp('^/profile/orders$'), new Orders()),
            // new Route(new RegExp('^/profile/favourites$'), new Favourite()),
            new Route(new RegExp('^/profile/settings$'), new Settings()),
        ], content);

        container.querySelector('#btn-products')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои объявления'
            },
            link: '/profile/products',
            leftIcon: svg({ content: listIcon , width: 20, height: 20 })
        }));

        container.querySelector('#btn-orders')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои заказы'
            },
            link: '/profile/orders',
            leftIcon: svg({ content: cartIcon, width: 20, height: 20 })
        }));

        // container.querySelector('#btn-favorite')?.replaceWith(button({
        //     variant: 'neutral',
        //     subVariant: 'tertiary',
        //     text: {
        //         class: 'text-regular',
        //         content: 'Закладки'
        //     },
        //     link: '/profile/favourites',
        //     leftIcon: svg({ content: heartIcon, width: 20, height: 20 })
        // }));

        container.querySelector('#btn-settings')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Настройки'
            },
            link: '/profile/settings',
            leftIcon: svg({ content: settingsIcon, width: 20, height: 20 })
        }));

        container.querySelectorAll('button[data-link]').forEach(item => 
            
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (item.dataset.link !== location.pathname) {
                    this.router.navigateTo(item.dataset.link);
                }
            }, { capture: false })
        );
    }

    render() {
        const header = new Header().render();
        const root = document.createElement('div');

        this.renderRoot(root);     

        return [ header, root ];
    }
}

export default Profile;