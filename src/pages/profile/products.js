import template from './templates/products.hbs';
import placeholder from './templates/placeholder.hbs';
import './styles/products.scss';

import { User } from '../../shared/api/user.js';
import statuses from '../../shared/statuses/statuses.js';

import { loaderRegular } from '../../components/loader/loader.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { Card } from '../../components/card/card.js';

import { stringToElement } from '../../shared/utils/parsing.js';

class Products {

    constructor(parent, variant='default') {
        this.parent = parent;
        this.variant = variant;
        const params = history.state;

        if (params) {
            if (params[ 'salerId' ]) {
                this.variant = 'saler';
            }
        }
    }

    async getProducts(container) {
        try {
            let resp;
            if (this.variant === 'saler') {
                resp = await User.getProductsOfAnotherSaler(history.state.salerId);
            }
            else {
                resp = await User.getProducts();
            }
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

            return body;

        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        }
    }

    async renderAll(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        const products = await this.getProducts(container);

        container.innerHTML = '';

        if (!products){
            container.innerHTML = placeholder();
        }
        else {
            products.forEach((elem) => {
                container.appendChild(new Card(elem, this.variant === 'saler' ? 'profile-saler' : 'profile', 'reRender').render());
            });
        }
    }

    async renderNotActive(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = await this.getProducts(container);

        container.innerHTML = '';

        if (!products) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => !value.is_active);
            products.forEach((elem) => {
                container.appendChild(new Card(elem, 'profile').render());
            });
        }
    }

    async renderActive(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = await this.getProducts(container);

        container.innerHTML = '';

        if (!products) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => value.is_active);
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem, this.variant === 'saler' ? 'profile-saler' : 'profile').render());
            });
        }
    }

    async renderSoled(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = await this.getProducts(container);

        container.innerHTML = '';

        if (!products) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => value.available_count < 1);
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem, this.variant === 'saler' ? 'profile-saler' : 'profile').render());
            });
        }
    }

    renderOwnProducts(root) {
        const container = root.querySelector('#products-container');

        root.querySelector('#tab-all').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderAll(container);
            }
        });

        root.querySelector('#tab-notActive').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderNotActive(container);
            }
        });

        root.querySelector('#tab-active').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderActive(container);
            }
        });

        root.querySelector('#tab-soled').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderSoled(container);
            }
        });

        root.querySelectorAll('.tab').forEach((value) => {
            value.addEventListener('click', (e) => {
                if (this.selected != null) {
                    this.selected.classList.toggle('selected');
                }

                e.currentTarget.classList.toggle('selected');
                this.selected = e.currentTarget;
            });
        });

        root.querySelector('#tab-all').click();
    }

    renderSalerProducts(root) {
        const container = root.querySelector('#products-container');

        root.querySelector('#tab-active').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderActive(container);
            }
        });

        root.querySelector('#tab-soled').addEventListener('click', (e) => {
            if (this.selected != e.currentTarget) {
                this.renderSoled(container);
            }
        });

        root.querySelectorAll('.tab').forEach((value) => {
            value.addEventListener('click', (e) => {
                if (this.selected != null) {
                    this.selected.classList.toggle('selected');
                }

                e.currentTarget.classList.toggle('selected');
                this.selected = e.currentTarget;
            });
        });
        root.querySelector('#tab-all')?.remove();
        root.querySelector('#tab-notActive')?.remove();
        root.querySelector('#tab-active').click();
    }

    render() {
        this.parent.activePage = this;
        const root = stringToElement(template());
        const params = history.state;
        if (params) {
            if (params[ 'salerId' ] != undefined) {
                this.variant = 'saler';
            }
        }

        switch(this.variant) {
            case 'saler':
                this.renderSalerProducts(root, params);
                break;
            default:
                this.renderOwnProducts(root);
                break;
        }

        return [ root ];
    }
}

export default Products;