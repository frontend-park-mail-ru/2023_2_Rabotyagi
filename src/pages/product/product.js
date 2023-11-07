import { stringToElement } from '../../shared/utils/parsing.js';
import template from './product.hbs';
import './product.scss';
import { Header } from '../../components/header/header.js';
import { Post } from '../../shared/api/post.js';
import { loaderRegular } from '../../components/loader/loader.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import Menu from "./menu";
import Content from "./content";

class Product {
    

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
                productId: body.id,
                saler: body.saler,
                price: body.price,
                safe_deal: body.safe_deal,
                delivery: body.delivery,
            };

            container.append(
                new Content().render(body), 
                new Menu(menuContext).render() 
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