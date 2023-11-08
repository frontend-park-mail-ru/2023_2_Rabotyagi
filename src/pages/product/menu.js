import { stringToElement } from '../../shared/utils/parsing';
import template from './menu.hbs';
import button from '../../components/button/button';
import { Order } from '../../shared/api/order.js';
import { store } from '../../shared/store/store.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';

class Menu {
    constructor(context) {
        this.context = context;
    }

    async addInCart(container) {
        try {
            if (!store.cart.sameUser(this.context.saler.id)) {
                throw new Error("В корзину можно добавлять продукты только с одинаковым пользователем");
            }
            if (store.cart.hasProduct(this.context.productId)) {
                throw new Error("Данный продукт уже есть в корзине");
            }
            const resp = await Order.create({
                count: 1,
                product_id: this.context.productId,
            });
            const body = resp.body;
            if (resp.status != 200) {
                throw body.error;
            }
            dispatcher.dispatch({ type: 'ADD_GOOD', payload: {
                order: body,
                saler: this.context.saler
            } });
            container.querySelector('#errorBox').innerHTML = '';
        } catch(err) {
            container.querySelector('#errorBox').innerHTML = '';
            container.querySelector('#errorBox').appendChild(ErrorMessageBox(err));
        }
    }

    render() {
        const root = stringToElement(template(this.context));

        if (this.context.saler.id !== store.user.state.fields.userID) {
            root.querySelector('#button-ad')?.replaceWith(button({
                id: 'btn-ad',
                variant: 'primary',
                text: {
                    class: 'text-regular',
                    content: 'Добавить в корзину'
                },
                style: 'width: 100%;'
            }));
    
            root.querySelector('#send-message')?.replaceWith(button({
                variant: 'outlined',
                text: {
                    class: 'text-regular',
                    content: 'Написать продавцу'
                },
                style: 'width: 100%;'
            }));
        }


        root.querySelector('#btn-ad')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addInCart(root);
        });

        return root;
    }
}

export default Menu;