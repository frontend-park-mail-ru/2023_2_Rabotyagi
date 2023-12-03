import templateView from './templates/productView.hbs';
import templateAdd from './templates/productAdd.hbs';
import './styles/product.scss';

import { store } from '../../shared/store/store.js';

import Menu from './menu.js';
import Content from './content.js';

import { Header } from '../../components/header/header.js';
import { loaderRegular } from '../../components/loader/loader.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import button from '../../components/button/button.js';

import { Product } from '../../shared/api/product.js';
import { User } from '../../shared/api/user.js';
import { Files } from '../../shared/api/file.js';
import statuses from '../../shared/statuses/statuses.js';

import { extname } from '../../shared/utils/extname.js';
import { stringToElement } from '../../shared/utils/parsing.js';

class ProductPage {
    async getSaler(salerID) {
        return await User.getSaler(salerID);
    }

    async getProduct(id, container) {
        container.appendChild(loaderRegular());

        try {
            const respPost = await Product.get(id);
            const bodyPost = respPost.body;

            if (!statuses.IsSuccessfulRequest(respPost)) {
                if (statuses.IsBadFormatRequest(respPost)) {
                    throw statuses.USER_MESSAGE;
                }
                else if (statuses.IsInternalServerError(respPost)) {
                    throw statuses.SERVER_MESSAGE;
                }
                else if (statuses.IsUserError(respPost)) {
                    throw bodyPost.error;
                }
            }

            const respSaler = await this.getSaler(bodyPost.saler_id);
            const bodySaler = respSaler.body;

            if (bodySaler.avatar && typeof bodySaler.avatar !== 'string'){
                if (bodySaler.avatar.Valid) {
                    bodySaler.avatar = bodySaler.avatar.String;
                }
                else {
                    delete bodySaler.avatar;
                }
            }

            container.innerHTML = '';
            const menuContext = {
                productId: bodyPost.id,
                saler: bodySaler,
                price: bodyPost.price,
                safeDeal: bodyPost.safe_deal,
                delivery: bodyPost.delivery,
            };

            container.append(
                new Content(bodyPost).render(),
                new Menu(menuContext).render(),
            );

            return;
        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));

            return;
        }
    }

    async uploadImages() {
        if (this.imagesForUpload) {
            const res = await Files.images(this.imagesForUpload);

            if (!statuses.IsSuccessfulRequest(res)) {
                this.errorBox.innerHTML = '';

                if (statuses.IsBadFormatRequest(res)) {
                    this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
                }
                else if (statuses.IsInternalServerError(res)) {
                    this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
                }
                else if (statuses.IsUserError(res)) {
                    this.errorBox.append(ErrorMessageBox(res.body.error));
                }

                return;
            }

            this.uploadedImages = res.body.urls;
        }
    }

    imagesChange = (e) => {
        e.stopPropagation();

        const allowedFormats = this.images.accept
            .replaceAll('.', '')
            .replaceAll(' ', '')
            .split(',');

        this.errorBox.innerHTML = '';
        const files = Array.from(this.images.files);

        files.forEach((file) => {
            const format = extname(file.name);
            if (!(
                allowedFormats.find((value) => value === format)
            )) {
                this.errorBox.appendChild(ErrorMessageBox(`Формат ${format} недопустим`));

                return;
            }
        });

        this.imagesForUpload = files;
    };

    formSubmit = async(e) => {
        e.preventDefault();

        const { elements } = this.content;
        const data = Array.from(elements)
            .filter((item) => !!item.name && !!item.value)
            .map((element) => {
                const { name, value, checked, type, files } = element;
                if (type === 'checkbox') {
                    return { [ name ]: Boolean(checked) };
                }

                if (type === 'number') {
                    return { [ name ]: Number(value) };
                }

                if (type === 'file') {
                    return { [ name ]: files };
                }

                return { [ name ]: value };
            });

        let body = {};
        data.forEach((elem) => body = { ...body, ...elem });

        body['city_id'] = Number(body.city_id);
        body['category_id'] = Number(body.category_id);
        body['saler_id'] = store.user.state.fields.id;

        await this.uploadImages();

        body.images = [];
        if (this.uploadedImages) {
            this.uploadedImages.forEach((url) => body.images = [ ...body.images, {
                url: url,
            } ]);
        }
        else {
            this.errorBox.innerHTML = '';
            this.errorBox.appendChild(ErrorMessageBox('Должно быть хотя бы одно изображение'));

return;
        }

        const res = await Product.create(body);
        body = res.body;

        if (statuses.IsRedirectResponse(res)) {
            window.Router.navigateTo('/product', { productId: body.id });

return;
        }

        this.errorBox.innerHTML = '';
        this.errorBox.appendChild(ErrorMessageBox(body.error));
    };

    renderAdd() {
        const context = {
            isAuth: store.user.isAuth(),
            categories: store.categories.list,
            cities: store.cities.list,
        };

        this.root = stringToElement(templateAdd(context));
        this.content = this.root.querySelector('.product>.content-add');
        this.images = this.content?.querySelector('#input-images');
        this.errorBox = this.content?.querySelector('#errorBox');

        this.images?.addEventListener('change', this.imagesChange);
        this.content?.addEventListener('submit', this.formSubmit);
        this.content?.querySelector('.btn-group>#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Создать',
            },
            type: 'submit',
        }));
    }

    renderView(params) {
        this.root = stringToElement(templateView());
        const container = this.root.querySelector('.product');

        this.getProduct(params.productId, container);
    }

    render() {
        const params = history.state;
        const header = new Header().render();

        switch (history.state.mode) {
            case 'add':
                this.renderAdd();
                break;

            default:
                this.renderView(params);
                break;
        }

        return [ header, this.root ];
    }
}

export default ProductPage;
