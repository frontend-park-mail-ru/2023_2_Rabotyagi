import { stringToElement } from '../../shared/utils/parsing';
import template from './content.hbs';
import templateChange from './contentChange.hbs';
import button from '../../components/button/button';
// import svg from '../../components/svg/svg';
// import favIcon from '../../assets/icons/fav.svg';
import { UserApi } from '../../shared/api/user';
import { store } from '../../shared/store/store';
import { Post } from '../../shared/api/post';
import ajax from '../../shared/services/ajax';
import Handlebars from 'handlebars/runtime';
import { ErrorMessageBox } from '../../components/error/errorMessageBox';

const { MOCK } = process.env;

class Content {
    constructor(context) {
        this.context = context;
        this.context.category = store.categories.getById(this.context.category_id);
        this.context.categories = store.categories.list;
    }

    renderChange() {
        Handlebars.registerHelper('selected', (id) => {
            if (id === this.context.category_id) {
                return 'selected';
            }

            return '';
        });

        if (this.context.images) {
            this.context.image = MOCK === 'true' ? 
                this.context.images[ 0 ].url
                :
                ajax.ADRESS_BACKEND + this.context.images[ 0 ].url;
        }

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
            body.saler_id = store.user.state.fields.userID;

            const res = await Post.put(this.context.id, body);
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
        if (this.context.images) {
            this.context.image = MOCK === 'true' ? 
                this.context.images[ 0 ].url
                :
                ajax.ADRESS_BACKEND + this.context.images[ 0 ].url;
        }

        const root = stringToElement(template(this.context));

        return root;
    }

    render() {
        let root;

        if (store.user.isAuth() && (this.context.saler_id === store.user.state.fields.userID)) {
            root = this.renderChange();
        }
        else {
            root = this.renderView();
        }

        // if (store.user.isAuth() && (context.saler_id !== store.user.state.fields.userID)) {
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

        root.querySelector('.content>.header>button')?.addEventListener('click', async function() {
            await UserApi.addToFav(this.context.id);
            this.classList.toggle('active');
        });

        return root;
    }
}

export default Content;