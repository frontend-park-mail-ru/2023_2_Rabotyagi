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

        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        }
    }

    render() {
        const root = stringToElement(template());
        const container = root.querySelector('#products-container');
        container.appendChild(loaderRegular());

        this.getProducts(container);

        root.querySelectorAll('.tab').forEach((value) => {
            value.addEventListener('click', (e) => {
                if (this.selected != null) {
                        this.selected.classList.toggle('selected');
                }

                e.currentTarget.classList.toggle('selected');
                this.selected = e.currentTarget;
            });
        });

        return root;
    }
}

export default Products;