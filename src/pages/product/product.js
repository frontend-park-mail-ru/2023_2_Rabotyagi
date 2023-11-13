import { stringToElement } from '../../shared/utils/parsing.js';
import templateView from './templates/productView.hbs';
import templateAdd from './templates/productAdd.hbs';
// import templateChange from './productChange.hbs';
import './styles/product.scss';
import { Header } from '../../components/header/header.js';
import { Product } from '../../shared/api/product.js';
import { loaderRegular } from '../../components/loader/loader.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import Menu from "./menu.js";
import Content from "./content.js";
import { User } from '../../shared/api/user.js';
import button from '../../components/button/button.js';
import { store } from '../../shared/store/store.js';
import { Files } from '../../shared/api/file.js';
import { extname } from '../../shared/utils/extname.js';

const allowedFormats = [ 'jpg, png, jpeg' ];

class ProductPage {
    async getSaler(salerID) {
        return await User.getProfile(salerID);
    }    

    async getProduct(id, container) {
        container.appendChild(loaderRegular());

        try {
            const respPost = await Product.get(id);
            const bodyPost = respPost.body;

            if (respPost.status != 200) {
                throw new Error(bodyPost.error);
            }
            
            const respSaler = await this.getSaler(bodyPost.saler_id);
            const bodySaler = respSaler.body;

            container.innerHTML = '';
            const menuContext = {
                productId: bodyPost.id,
                saler: bodySaler,
                price: bodyPost.price,
                safe_deal: bodyPost.safe_deal,
                delivery: bodyPost.delivery,
            };

            container.append(
                new Content(bodyPost).render(), 
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
        const context = {
            isAuth: store.user.isAuth(),
            categories: store.categories.list,
        }

        const root = stringToElement(templateAdd(context));
        const content = root.querySelector('.product>.content-add');
        const images = content?.querySelector('#input-images');

        images?.addEventListener('change', async (e) => {
            e.stopPropagation();

            const errorBox = content.querySelector('#errorBox');

            errorBox.innerHTML = '';
            const files = Array.from(images.files);

            files.forEach((file) => {
                const format = extname(file.name);
                if (!(format in allowedFormats)) {
                    errorBox.appendChild(ErrorMessageBox(`Формат ${format} недопустим`));
                }
            });

            const res = await Files.images(files);

            if (res.status !== 200) {
                errorBox.innerHTML = '';
                errorBox.append(ErrorMessageBox(res.body.error));
            }

            this.uploadedImages = res.body.urls;
        });

        content?.addEventListener('submit', async (e) =>  {
            e.preventDefault();

            const errorBox = content.querySelector('#errorBox');

            const { elements } = content;
            const data = Array.from(elements)
            .filter((item) => !!item.name && !!item.value)
            .map((element) => {
                const { name, value, checked, type, files } = element;
                if (type === 'checkbox'){
                    return { [ name ]: Boolean(checked) };
                }

                if (type === 'number') {
                    return { [ name ]: Number(value) };
                }

                if (type === 'file') {
                    return { [ name ]: files }
                }

                return { [ name ]: value };
            })

            let body = {};
            data.forEach((elem) => body = { ...body, ...elem });

            body.category_id = Number(body.category_id);
            body.saler_id = store.user.state.fields.userID;

            if (this.uploadedImages) {
                this.uploadedImages.forEach((url) => body.images = [ ...body.images, {
                    url: url
                } ])
            }
            else {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox('Должно быть хотя бы одно изображение'));
                return;
            }

            const res = await Product.create(body);
            body = res.body;


            if (res.status === 303){
                window.Router.navigateTo('/product', { productId: body.id });
                return;
            }

            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(body.error));
            return;

        });

        content?.querySelector('.btn-group>#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Создать'
            },
            type: 'submit'
        }))

        return root;
    }

    // renderChange(params) {
    //     const root = stringToElement(templateChange());
    //     const content = root.querySelector('.product');
    //     content.append(new Content())

    //     // content?.addEventListener('submit', async function(e)  {
    //     //     e.preventDefault();

    //     //     const { elements } = this;
    //     //     const data = Array.from(elements)
    //     //     .filter((item) => !!item.name && !!item.value)
    //     //     .map((element) => {
    //     //         const { name, value, checked, type } = element;

    //     //         if (type === 'checkbox'){
    //     //             return { [ name ]: Boolean(checked) };
    //     //         }

    //     //         if (type === 'number') {
    //     //             return { [ name ]: Number(value) };
    //     //         }

    //     //         return { [ name ]: value };
    //     //     })

    //     //     let body = {};
    //     //     data.forEach((elem) => body = { ...body, ...elem });

    //     //     body.saler_id = store.user.state.fields.userID;

    //     //     const res = await Product.create(body);
    //     //     body = res.body;

    //     //     const errorBox = content.querySelector('#errorBox');

    //     //     if (res.status === 303){
    //     //         window.Router.navigateTo('/product', { productId: body.id });
    //     //         return;
    //     //     }

    //     //     errorBox.innerHTML = '';
    //     //     errorBox.appendChild(ErrorMessageBox(body.error));
    //     //     return;

    //     // });

    //     // content?.querySelector('.btn-group>#btn-submit').replaceWith(button({
    //     //     id: 'btn-submit',
    //     //     variant: 'primary',
    //     //     text: {
    //     //         class: 'text-regular',
    //     //         content: 'Создать'
    //     //     },
    //     //     type: 'submit'
    //     // }))

    //     return root;
    // }

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

            // case 'change':
            //     root = this.renderChange(params);

            default:
                root = this.renderView(params);
                break;
        }

        return [ header, root ];
    }
}

export default ProductPage;