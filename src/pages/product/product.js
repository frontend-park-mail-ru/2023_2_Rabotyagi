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
    constructor() {

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

        return [ header, root ];
    }
}

export default Product;