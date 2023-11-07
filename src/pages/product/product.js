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

class Product {
    #attrs

    constructor() {
        this.#attrs = {};
    }

    getId() {
        return window.location.pathname.split("/")[2];
    }

    async addInCart() {
        try {
            if (store.cart.sameUser(this.#attrs.saler.id) && !store.cart.hasProduct(this.#attrs.id)) {
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
                
            } else {
                throw new Error("Other orders have not this user");
            }
        } catch(err) {
            console.log(err);
        }
    }

    async getPostInfo(id, container) {
        try {
            const resp = await Post.getPost(id);
            const body = await resp.json();

            if (resp.status != 200) {
                throw body.error;
            }

            const respUser = await UserApi.getSaler(body.saler_id);
            const bodyUser = await respUser.json();

            if (respUser.status != 200) {
                throw bodyUser.error;
            }

            this.#attrs.saler = {
                id: bodyUser.id,
                name: bodyUser.name,
                email: bodyUser.email,
            };
            Object.keys(body).forEach((attrKey) => {
                this.#attrs[attrKey] = body[attrKey];
            }); 
            console.log(this.#attrs);

            container.querySelector('div.product-loader').innerHTML = '';
            const titleBox = container.querySelector('div.product-title');
            titleBox.innerHTML = this.#attrs.title;
            const buyButton = button({
                variant: 'primary',
                style: 'width: 100%',
                text: {
                    content: 'В корзину',
                    class: 'text-regular'
                }
            });
            buyButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addInCart();
            });
            container.querySelector('#addProduct').replaceWith(buyButton);
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const context = {
            product: "product",
        };
        const header = new Header();

        const root = stringToElement(template(context));
        root.querySelector('#header').replaceWith(header.render());

        const container = root.querySelector('div.product-content');
        container.querySelector('div.product-loader').appendChild(loaderRegular());

        this.getPostInfo(this.getId(), container);
                    
        return root;
    }
}

export default Product;