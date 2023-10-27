import { stringToElement } from '../../shared/utils/parsing.js';
import template from './profile.hbs'
import styles from './profile.scss' // eslint-disable-line no-unused-vars
import { Header } from '../../components/header/header.js';
import Breadcrumb from '../../components/breadcrumb/breadcrumb.js';
import { store } from '../../shared/store/store.js';
import uid from '../../shared/utils/uid.js';
import { Router } from '../../shared/services/router.js';

class Profile {
    constructor() {
        this.selected = null;
    }

    async getProfile() {

    };

    render() {
        const context = {
            user: store.user.state.fields
        };
        const header = new Header();
        const breadcrumb = new Breadcrumb([
            {
                id: uid(),
                text: "Главная",
                isActive: true,
                delegate: (container) => {
                    console.log(container);
                    console.log(this)
                    container.querySelector(`#${this.id}`).addEventListener('click', (e) => {
                        e.stopPropagation();
                        Router.navigateTo('/');
                    })
                }
            },
            {
                text: "Мои объявления"
            }
        ])
        const root = stringToElement(template(context));
        const wrapper = document.createElement('div');

        wrapper.classList.toggle('wrapper');
        wrapper.appendChild(root);
        wrapper.style.backgroundColor = '#F0F1F3';

        root.querySelector('.breadcrumb').replaceWith(breadcrumb.render());

        root.querySelectorAll('.tab').forEach((value) => {
            value.addEventListener('click', (e) => {
                if (this.selected != null) {
                    this.selected.classList.toggle('tab-selected');
                }
                e.currentTarget.classList.toggle('tab-selected');
                this.selected = e.currentTarget;
                console.log(this.selected);
            });
        })

        return [ header.render(), wrapper ];
    }
}

export default Profile;