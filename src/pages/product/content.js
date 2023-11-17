import { stringToElement } from '../../shared/utils/parsing';
import template from './templates/content.hbs';
import templateChange from './templates/contentChange.hbs';
import button from '../../components/button/button';
// import svg from '../../components/svg/svg';
// import favIcon from '../../assets/icons/fav.svg';
import { User } from '../../shared/api/user';
import { store } from '../../shared/store/store';
import { Product } from '../../shared/api/product';
import Handlebars from 'handlebars/runtime';
import { ErrorMessageBox } from '../../components/error/errorMessageBox';
import { Carousel } from '../../components/carousel/carousel';
import { getResourceUrl } from '../../shared/utils/getResource';

class Content {
    constructor(context) {
        this.context = context;
        this.context.category = store.categories.getById(this.context.category_id);
        this.context.categories = store.categories.list;
        this.context.images = getResourceUrl(this.context.images);
    }

    renderChange() {
        Handlebars.registerHelper('selected', (id) => {
            if (id === this.context.category_id) {
                return 'selected';
            }

            return '';
        });

        const root = stringToElement(templateChange(this.context));

        root?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const { elements } = root;
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
            
            body.category_id = Number(body.category_id);
            body.saler_id = store.user.state.fields.id;

            const res = await Product.put(this.context.id, body);
            body = res.body;

            const errorBox = root.querySelector('#errorBox');

            if (res.status === 303){
                window.Router.navigateTo('/product', { productId: this.context.id })
                return;
            }

            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(body.error));

            return;

        });

        root?.querySelector('.btn-group>#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Сохранить'
            },
            type: 'submit',
            style: 'width: 100%',
        }))

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

        // if (store.user.isAuth() && (context.saler_id !== store.user.state.fields.id)) {
        //     root.querySelector('.content>.header').appendChild(button({
        //         variant: 'neutral',
        //         subVariant: 'tertiary',
        //         text: {
        //             class: 'text-regular',
        //             content: 'Добавить в избранное'
        //         },
        //         leftIcon: svg({ content: favIcon, width: 20, height: 20 })
        //     }));
        // }
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