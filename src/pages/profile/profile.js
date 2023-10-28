import { stringToElement } from '../../shared/utils/parsing.js';
import template from './profile.hbs'
import styles from './profile.scss' // eslint-disable-line no-unused-vars
import { Header } from '../../components/header/header.js';
// import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
// import uid from '../../shared/utils/uid.js';
import { Router, Route } from '../../shared/services/router.js';
import Orders from './orders/orders.js';
import Products from './products/products.js';
import Favourite from './favourite/favourite.js';

class Profile {
    constructor() {
        this.selected = null;
    }

    async getProfile() {
        console.log('loaded');
    };

    render() {
        const context = {
            user: store.user.state.fields
        };
        const header = new Header();
        // const breadcrumb = new Breadcrumb([
        //     {
        //         id: uid(),
        //         text: "Главная",
        //         isActive: true,
        //         delegate: function(container) {
        //             container.querySelector(`#i${this.id}`).addEventListener('click', (e) => {
        //                 e.stopPropagation();
        //                 window.Router.navigateTo('/');
        //             })
        //         }
        //     },
        //     {
        //         text: "Мои объявления"
        //     }
        // ])
        const root = stringToElement(template(context));
        root.querySelector('#header').replaceWith(header.render());
        const content = root.querySelector('.content');

        this.getProfile();

        this.router = new Router([
            new Route(new RegExp('^/profile/products$'), new Products()),
            new Route(new RegExp('^/profile/orders$'), new Orders()),
            new Route(new RegExp('^/profile/favourites$'), new Favourite()),
        ], content);

        root.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.router.navigateTo(item.dataset.link);
            }, { capture: false })
        )
        // root.querySelector('.breadcrumb').replaceWith(breadcrumb.render());
    
        // router.navigateTo('/profile/products');
                    
        return root;
    }
}

export default Profile;