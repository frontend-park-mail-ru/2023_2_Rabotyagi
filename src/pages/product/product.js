import { stringToElement } from '../../shared/utils/parsing.js';
import template from './product.hbs';
import './product.scss';
import { Header } from '../../components/header/header.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { Post } from '../../shared/api/post.js';
import { Order } from '../../shared/api/order.js';
import { UserApi } from '../../shared/api/user.js';
import { loaderRegular } from '../../components/loader/loader.js';
import button from '../../components/button/button.js';
// import uid from '../../shared/utils/uid.js';

import { store } from '../../shared/store/store.js';
import dispatcher from '../../shared/dispatcher/dispatcher.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { UserCard } from '../../components/userCard/userCard.js';

import { Header } from "../../components/header/header";
import { stringToElement } from "../../shared/utils/parsing";
import template from './product.hbs';
import { Post } from "../../shared/api/post";
import Menu from "./menu";
import './product.scss';
import Content from "./content";
import { ErrorMessageBox } from "../../components/error/errorMessageBox";
import { loaderRegular } from "../../components/loader/loader";

class Product {
    #attrs

    constructor() {
        this.#attrs = {};
    }

    getId() {
        return history.state.productId;
    }

    async addInCart(container) {
        try {
            if (!store.cart.sameUser(this.#attrs.saler.id)) {
                throw new Error("В корзину можно добавлять продукты только с одинаковым пользователем");
            }
            if (store.cart.hasProduct(this.#attrs.id)) {
                throw new Error("Данный продукт уже есть в корзине");
            }
            const resp = await Order.create({
                count: 1,
                product_id: this.#attrs.id,
            });
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            dispatcher.dispatch({ type: 'ADD_GOOD', payload: {
                order: body,
                saler: this.#attrs.saler
            }});
            container.querySelector('#errorBox').innerHTML = '';
        } catch(err) {
            container.querySelector('#errorBox').innerHTML = '';
            container.querySelector('#errorBox').appendChild(ErrorMessageBox(err));
            console.log(err);
        }
    }

    async getProduct(id, container) {
        container.appendChild(loaderRegular());

        try {
            const resp = await Post.get(id);
            const body = await resp.json();
            if (resp.status != 200) {
                throw new Error(body.error);
            }

            container.innerHTML = '';
            const menuContext = {
                ...body.saler,
                price: body.price,
                safeDeal: body.safeDeal,
                delivery: body.delivery,
            };
            container.append(
                new Content().render(body), 
                new Menu().render(menuContext) 
            );

            return;
        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
            return;
        }
    }

    render() {
        const params = history.state;
        const context = {
            
        }
        const root = stringToElement(template(context));
        const header = new Header().render();
        const container = root.querySelector('.product');

        this.getProduct(params.productId, container);

        buyButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addInCart(container);
        });

        return [ header, root ];
    }
}

export default Product;