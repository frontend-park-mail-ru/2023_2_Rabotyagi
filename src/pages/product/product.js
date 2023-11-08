import { stringToElement } from '../../shared/utils/parsing.js';
import templateView from './productView.hbs';
import templateAdd from './productAdd.hbs';
import './product.scss';
import { Header } from '../../components/header/header.js';
import { Post } from '../../shared/api/post.js';
import { loaderRegular } from '../../components/loader/loader.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import Menu from "./menu";
import Content from "./content";
import { UserApi } from '../../shared/api/user.js';
import button from '../../components/button/button.js';
import { store } from '../../shared/store/store.js';

class Product {
    async getSaler(salerID) {
        return await UserApi.getProfile(salerID);
    }
    

    async getProduct(id, container) {
        container.appendChild(loaderRegular());

        try {
            const respUser = await Post.get(id);
            const bodyUser = respUser.body;

            if (respUser.status != 200) {
                throw new Error(bodyUser.error);
            }
            
            const respSaler = await this.getSaler(bodyUser.saler_id);
            const bodySaler = respSaler.body;

            container.innerHTML = '';
            const menuContext = {
                productId: bodyUser.id,
                saler: bodySaler,
                price: bodyUser.price,
                safe_deal: bodyUser.safe_deal,
                delivery: bodyUser.delivery,
            };

            container.append(
                new Content().render(bodyUser), 
                new Menu(menuContext).render() 
            );
            return;
        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
            return;
        }
    }

    renderAdd() {
        const root = stringToElement(templateAdd());
        const content = root.querySelector('.product>.content-add');

        content.addEventListener('submit', async function(e)  {
            e.preventDefault();

            const { elements } = this;
            const data = Array.from(elements)
            .filter((item) => !!item.name && !!item.value)
            .map((element) => {
                const { name, value, checked, type } = element;

                if (type === 'checkbox'){
                    return { [ name ]: Boolean(checked) };
                }

                if (type === 'number') {
                    return { [ name ]: Number(value) };
                }

                return { [ name ]: value };
            })

            let body = {};
            data.forEach((elem) => body = { ...body, ...elem });

            body.saler_id = store.user.state.fields.userID;

            const res = await Post.create(body);
            body = res.body;

            const errorBox = content.querySelector('#errorBox');

            if (res.status === 303){
                window.Router.navigateTo('/product', { productId: body.id });
                return;
            }

            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(body.error));
            return;

        });

        content.querySelector('.btn-group>#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Создать'
            },
            type: 'submit'
            // style: 'width: 100%;'
        }))



        // this.getProduct(params.productId, container);

        return root;
    }

    renderView(params) {
        const root = stringToElement(templateView());
        const container = root.querySelector('.product');

        this.getProduct(params.productId, container);

        return root;
    }

    render() {
        const params = history.state;

        const header = new Header().render();
        let root;

        switch (history.state.mode) {
            case 'add':
                root = this.renderAdd();
                break;

            default:
                root = this.renderView(params);
        }

        return [ header, root ];
    }
}

export default Product;