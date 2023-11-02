import { stringToElement } from '../../shared/utils/parsing.js';
import template from './product.hbs';
import './product.scss';
import { Header } from '../../components/header/header.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
import { Post } from '../../shared/api/post.js';
import { Order } from '../../shared/api/order.js';
import { loaderRegular } from '../../components/loader/loader.js';
import button from '../../components/button/button.js';
// import uid from '../../shared/utils/uid.js';

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
            const resp = await Order.create(this.#attrs);
            const body = await resp.json();
            if (resp.status != 200) {
                throw body.error;
            }
            store.cart.addInCart({...body});
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
            Object.keys(body.product).forEach((attrKey) => {
                this.#attrs[attrKey] = body[attrKey];
            });
            container.querySelector('div.product-loader').innerHTML = '';
            const titleBox = container.querySelector('div.product-title');
            titleBox.innerHTML = body.product.title;
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