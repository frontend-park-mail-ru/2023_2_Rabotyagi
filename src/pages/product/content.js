import Handlebars from 'handlebars/runtime';
import template from './templates/content.hbs';
import templateChange from './templates/contentChange.hbs';

import { store } from '../../shared/store/store';

import { ErrorMessageBox } from '../../components/error/errorMessageBox';
import { Carousel } from '../../components/carousel/carousel';

import button from '../../components/button/button';

import { User } from '../../shared/api/user';
import { Product } from '../../shared/api/product';
import { Files } from '../../shared/api/file';
import statuses from '../../shared/statuses/statuses';

import { getResourceUrl } from '../../shared/utils/getResource';
import { extname } from '../../shared/utils/extname';
import { stringToElement } from '../../shared/utils/parsing';

class Content {

    constructor(context) {
        this.context = context;
        this.context.city = store.cities.getById(this.context.city_id);
        this.context.cities = store.cities.list;
        this.context.category = store.categories.getById(this.context.category_id);
        this.context.categories = store.categories.list;
        this.context['created_at'] = this.context.created_at.split('T')[ 0 ] + ' ' + this.context.created_at.split('T')[ 1 ].split('Z')[ 0 ];
        this.imagesBackup = structuredClone(this.context.images);
        this.context.images = getResourceUrl(this.context.images);
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

    renderChange() {
        Handlebars.registerHelper('selected', (id) => {
            if (id === this.context.category_id) {
                return 'selected';
            }

            return '';
        });

        const root = stringToElement(templateChange(this.context));
        this.images = root.querySelector('#input-images');
        this.images?.addEventListener('change', this.imagesChange);
        this.errorBox = root.querySelector('#errorBox');

        root?.addEventListener('submit', async(e) => {
            e.preventDefault();

            const { elements } = root;
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

            if (this.uploadedImages) {
                body.images = [];
                this.uploadedImages.forEach((url) => body.images = [ ...body.images, {
                    url: url,
                } ]);
            } else {
                body.images = this.imagesBackup;
            }

            const res = await Product.put(this.context.id, body);
            body = res.body;

            if (statuses.IsRedirectResponse(res)){
                window.Router.navigateTo('/product', { productId: this.context.id });

                return;
            }

            this.errorBox.innerHTML = '';
            if (statuses.IsBadFormatRequest(res)) {
                this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
            } 
            else if (statuses.IsInternalServerError(res)) {
                this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
            }
            else if (statuses.IsUserError(res)) {
                this.errorBox.append(ErrorMessageBox(body.error));
            }

            return;

        });

        root?.querySelector('.btn-group>#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Сохранить',
            },
            type: 'submit',
            style: 'width: 100%',
        }));

        return root;
    }

    renderView() {
        const root = stringToElement(template(this.context));

        return root;
    }

    render() {
        let root;

        if (store.user.isAuth() && (this.context.saler_id === store.user.state.fields.id)) {
            root = this.renderChange();
        }
        else {
            root = this.renderView();
        }

        const carousel = new Carousel(this.context.images);
        root.querySelector('#carousel')?.replaceWith(carousel.render());

        root.querySelector('.content>.header>button')?.addEventListener('click', async function() {
            await User.addToFav(this.context.id);
            this.classList.toggle('active');
        });

        return root;
    }
}

export default Content;
