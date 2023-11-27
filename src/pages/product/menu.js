import { stringToElement } from '../../shared/utils/parsing';
import template from './templates/menu.hbs';
import button from '../../components/button/button';
import { Order } from '../../shared/api/order.js';
import { store } from '../../shared/store/store.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { getResourceUrl } from '../../shared/utils/getResource.js';
import { User } from '../../shared/api/user.js';

const buttonTemplates = {
    btnAd: {
        // id: 'btn-ad',
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Добавить в корзину',
        },
        style: 'width: 100%;',
    },

    sendMessage: {
        // id: 'btn-msg',
        variant: 'outlined',
        text: {
            class: 'text-regular',
            content: 'Посмотреть профиль',
        },
        style: 'width: 100%;',
    },

    addToFav: {
        // id: 'btn-msg',
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
            if (resp.status != 200) {
                throw body.error;
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

        if (resp.status !== 303) {
            throw new Error(resp.body.error);
        }

        return;
    }

    render() {
        const root = stringToElement(template(this.context));
        const btnAd = button(buttonTemplates.btnAd);

        if (!store.user.isAuth() || (store.user.isAuth() && this.context.saler.id !== store.user.state.fields.id)) {
            const btnSendMessage = button(buttonTemplates.sendMessage);
            const btnAddToFav = button(buttonTemplates.addToFav);

            root.querySelector('#button-ad')?.replaceWith(btnAd);
            root.querySelector('#send-message')?.replaceWith(btnSendMessage);
            root.querySelector('#add-to-fav')?.replaceWith(btnAddToFav);

            btnSendMessage.addEventListener('click', () => window.Router.navigateTo('/saler/products', { salerId: this.context.saler.id, variant: 'saler' }));
            btnAddToFav.addEventListener('click', () => {
                this.addToFav()
                .then(() => {
                    btnAddToFav.querySelector('span').textContent = 'Уже в избранном!';
                })
                .catch(err => {
                    console.error(err);
                });
            });
        }

        btnAd.addEventListener('click', (e) => {
            e.stopPropagation();
            if (store.user.isAuth()) {
                this.addInCart(root);
            } else {
                window.Router.navigateTo('/signin');
            }
        });

        return root;
    }
}

export default Menu;
