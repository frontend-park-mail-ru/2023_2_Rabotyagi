import template from './templates/menu.hbs';

import { store } from '../../shared/store/store.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';

import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import button from '../../components/button/button';

import { Order } from '../../shared/api/order.js';
import { User } from '../../shared/api/user.js';
import statuses from '../../shared/statuses/statuses.js';

import { getResourceUrl } from '../../shared/utils/getResource.js';
import { stringToElement } from '../../shared/utils/parsing';

const buttonTemplates = {
    btnAd: {
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Добавить в корзину',
        },
        style: 'width: 100%;',
    },

    openProfile: {
        variant: 'outlined',
        text: {
            class: 'text-regular',
            content: 'Посмотреть профиль',
        },
        style: 'width: 100%;',
    },

    addToFav: {
        variant: 'outlined',
        text: {
            class: 'text-regular',
            content: 'Добавить в избранное',
        },
        style: 'width: 100%;',
    },

};

class Menu {
    constructor(context) {
        this.context = context;
        this.context.saler.avatar = getResourceUrl(this.context.saler.avatar);
    }

    async addInCart(container) {
        try {
            if (!store.cart.sameUser(this.context.saler.id)) {
                throw new Error('В корзину можно добавлять продукты только с одинаковым пользователем');
            }
            if (store.cart.hasProduct(this.context.productId)) {
                throw new Error('Данный продукт уже есть в корзине');
            }
            const resp = await Order.create({
                'count': 1,
                'product_id': this.context.productId,
            });
            const body = resp.body;

            if (!statuses.IsSuccessfulRequest(resp)) {
                if (statuses.IsBadFormatRequest(resp)) {
                    throw statuses.USER_MESSAGE;
                }
                else if (statuses.IsInternalServerError(resp)) {
                    throw statuses.SERVER_MESSAGE;
                }
                else if (statuses.IsUserError(resp)) {
                    throw body.error;
                }
            }

            dispatcher.dispatch({ type: 'ADD_GOOD', payload: {
                order: body,
                saler: this.context.saler,
            } });
            container.querySelector('#errorBox').innerHTML = '';
        } catch(err) {
            container.querySelector('#errorBox').innerHTML = '';
            container.querySelector('#errorBox').appendChild(ErrorMessageBox(err));
        }
    }

    async addToFav() {
        const resp = await User.addToFav(this.context.productId);

        if (!statuses.IsRedirectResponse(resp)) {
            if (statuses.IsBadFormatRequest(resp)) {
                throw statuses.USER_MESSAGE;
            }
            else if (statuses.IsInternalServerError(resp)) {
                throw statuses.SERVER_MESSAGE;
            }
            else if (statuses.IsUserError(resp)) {
                throw resp.body.error;
            }
        }

        return;
    }

    render() {
        const root = stringToElement(template(this.context));
        const btnAd = button(buttonTemplates.btnAd);
        const btnOpenProfile = button(buttonTemplates.openProfile);
        const btnAddToFav = button(buttonTemplates.addToFav);

        if (store.favs.getById(this.context.productId)){
            btnAddToFav.querySelector('span').textContent = 'Уже в избранном!';
            btnAddToFav.setAttribute('disabled', 'true');
        }

        root.querySelector('.saler').after(btnAd);
        btnAd.after(btnOpenProfile);

        btnOpenProfile.addEventListener('click', () => window.Router.navigateTo('/saler/products', { salerId: this.context.saler.id, variant: 'saler' }));
        btnAddToFav.addEventListener('click', () => {
            this.addToFav()
            .then(async() => {
                btnAddToFav.querySelector('span').textContent = 'Уже в избранном!';
                btnAddToFav.setAttribute('disabled', 'true');
                await store.favs.refresh();
            })
            .catch(err => {
                console.error(err);
            });
        });

        if (store.user.isAuth()) {
            btnAd.addEventListener('click', () => this.addInCart(root));

            if (this.context.saler.id !== store.user.state.fields.id) {
                btnOpenProfile.after(btnAddToFav);
            }
        } else {
            btnAd.addEventListener('click', () => window.Router.navigateTo('/signin'));
        }

        return root;
    }
}

export default Menu;
