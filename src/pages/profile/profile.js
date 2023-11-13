import { stringToElement } from '../../shared/utils/parsing.js';
import template from './templates/profile.hbs';
import './styles/profile.scss';
import { Header } from '../../components/header/header.js';
import { store } from '../../shared/store/store.js';
import { Router, Route } from '../../shared/services/router.js';
import Orders from './orders.js';
import Products from './products.js';
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import listIcon from '../../assets/icons/list-ad.svg';
import cartIcon from '../../assets/icons/cart.svg';
import settingsIcon from '../../assets/icons/settings.svg'
import Settings from './settings.js';
import { User } from '../../shared/api/user.js';

class Profile {
    activePage;

    constructor(variant='default') {
        this.activePage = null;
        this.variant = variant;
        const params = history.state;
        if (params) {
            if (params[ 'salerId' ] != undefined) {
                this.variant = 'saler';
            }
        };
    }

    async getProfile(id) {
        return await User.getProfile(id);
    }

    async renderOwnProfile(root) {
        const res = await this.getProfile(store.user.state.fields.userID);
        store.user.update(res.body);

        const container = stringToElement(template(res.body));
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

    async renderSaler(root, params) {
        const res = await this.getProfile(params.salerId);

        const container = stringToElement(template(res.body));
        root.replaceWith(container);
        const content = container.querySelector('.content');

        this.router = new Router([
            new Route(new RegExp('^/saler/products$'), new Products(this)),
        ], content);

        const btnProducts = button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Объявления'
            },
            link: '/saler/products',
            leftIcon: svg({ content: listIcon , width: 20, height: 20 })
        });

        btnProducts.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btnProducts.dataset.link !== location.pathname) {
                this.router.navigateTo(btnProducts.dataset.link, { salerId: params.salerId });
            }
        }, { capture: false });

        container.querySelector('#btn-products')?.replaceWith(btnProducts);
    }

    render() {
        const header = new Header().render();
        const root = document.createElement('div');
        const params = history.state;
        
        if (params) {
            if (params[ 'salerId' ] != undefined) {
                this.variant = 'saler';
            }
        };

        switch(this.variant) {
            case 'saler':
                this.renderSaler(root, params);
                break;
            default:
                this.renderOwnProfile(root);
                break;
        }

        return [ header, root ];
    }
}

export default Profile;