import template from './templates/profile.hbs';
import './styles/profile.scss';

import { store } from '../../shared/store/store.js';

import { Router, Route } from '../../shared/services/router.js';

import Orders from './orders.js';
import Products from './products.js';
import Settings from './settings.js';
import Favourite from './favourite.js';

import { Header } from '../../components/header/header.js';
import button from '../../components/button/button.js';

import { User } from '../../shared/api/user.js';

import svg from '../../components/svg/svg.js';
import listIcon from '../../assets/icons/list-ad.svg';
import cartIcon from '../../assets/icons/cart.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import favIcon from '../../assets/icons/fav.svg';

import { getResourceUrl } from '../../shared/utils/getResource.js';
import { stringToElement } from '../../shared/utils/parsing.js';

class Profile {
    activePage = null;

    constructor() {}

    async getProfile(id) {
        return await User.getProfile(id);
    }

    async renderOwnProfile(replaced) {
        const res = await this.getProfile(store.user.state.fields.id);
        store.user.update(res.body);

        const context = structuredClone(store.user.state.fields);
        context.avatar = getResourceUrl(context.avatar);
        const root = stringToElement(template(context));
        replaced.replaceWith(root);

        context.avatar = getResourceUrl(context.avatar);

        const content = root.querySelector('.content');

        this.router = new Router([
            new Route(new RegExp('^/profile/products$'), new Products(this)),
            new Route(new RegExp('^/profile/orders$'), new Orders()),
            new Route(new RegExp('^/profile/favourities$'), new Favourite()),
            new Route(new RegExp('^/profile/settings$'), new Settings()),
        ], content);

        root.querySelector('#btn-products')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои объявления',
            },
            link: '/profile/products',
            leftIcon: svg({ content: listIcon , width: 20, height: 20 }),
        }));

        root.querySelector('#btn-orders')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Мои заказы',
            },
            link: '/profile/orders',
            leftIcon: svg({ content: cartIcon, width: 20, height: 20 }),
        }));

        root.querySelector('#btn-settings')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Настройки',
            },
            link: '/profile/settings',
            leftIcon: svg({ content: settingsIcon, width: 20, height: 20 }),
        }));

        root.querySelector('#btn-favorite')?.replaceWith(button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Избранное',
            },
            link: '/profile/favourities',
            leftIcon: svg({ content: favIcon, width: 20, height: 20 }),
        }));

        root.querySelectorAll('button[data-link]').forEach(item =>

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (item.dataset.link !== location.pathname) {
                    this.router.navigateTo(item.dataset.link);
                }
            }, { capture: false }),
        );
    }

    async renderSaler(replaced) {
        const res = await this.getProfile(history.state.salerId);
        const root = stringToElement(template(res.body));
        replaced.replaceWith(root);

        const content = root.querySelector('.content');

        this.router = new Router([
            new Route(new RegExp('^/saler/products$'), new Products(this)),
        ], content);

        const btnProducts = button({
            variant: 'neutral',
            subVariant: 'tertiary',
            text: {
                class: 'text-regular',
                content: 'Объявления',
            },
            link: '/saler/products',
            leftIcon: svg({ content: listIcon , width: 20, height: 20 }),
        });

        btnProducts.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btnProducts.dataset.link !== location.pathname) {
                this.router.navigateTo(btnProducts.dataset.link, { salerId: history.state.salerId });
            }
        }, { capture: false });

        root.querySelector('#btn-products')?.replaceWith(btnProducts);
    }

    render() {
        const header = new Header().render();
        const params = history.state;
        const root = document.createElement('div');

        if (params && params.salerId) {
            this.renderSaler(root);
        }
        else {
            this.renderOwnProfile(root);
        }

        return [ header, root ];
    }
}

export default Profile;
