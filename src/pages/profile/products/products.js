import './products.scss';
import { stringToElement } from '../../../shared/utils/parsing';
import template from './products.hbs';
import placeholder from './placeholder.hbs';
import { UserApi } from '../../../shared/api/user.js';
import { loaderRegular } from '../../../components/loader/loader';
import { ErrorMessageBox } from '../../../components/error/errorMessageBox';
import { Card } from '../../../components/card/card';

class Products {
    constructor() {
    }

    async getProducts(container) {
        try {
            const resp = await UserApi.getProducts();
            const products = (await resp.json()).products;

            switch (resp.status) {
                case 222:
                    throw resp.body.error;
                default:
            }
            
            return products;

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

        if (products.length == 0) {
            container.innerHTML = placeholder();
        }
        else {
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem).render());
            });
        }
    }

    async renderNotActive(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = await this.getProducts(container);

        container.innerHTML = '';

        if (products.length == 0) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => !value.isActive);
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem).render());
            });
        }
    }

    async renderActive(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = await this.getProducts(container);

        container.innerHTML = '';

        if (products.length == 0) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => value.isActive);
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem).render());
            });
        }
    }

    async renderSoled(container) {
        container.innerHTML = '';
        container.appendChild(loaderRegular());

        let products = [];

        container.innerHTML = '';

        if (products.length == 0) {
            container.innerHTML = placeholder();
        }
        else {
            products = products.filter((value) => value.isActive);
            products.forEach((elem) => {
                elem.variant = 'profile';
                container.appendChild(new Card(elem).render());
            });
        }
    }

    render() {
        const root = stringToElement(template());
        const container = root.querySelector('#products-container');
        // container.appendChild(loaderRegular());

        // this.getProducts(container);

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

        return root;
    }
}

export default Products;