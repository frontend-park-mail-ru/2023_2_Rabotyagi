import { stringToElement } from '../../shared/utils/parsing.js';
import template from './profile.hbs'
import styles from './profile.scss'
import { Header } from '../../components/header/header.js';

class Profile {
    constructor() {
        this.selected = null;
    }

    async getProfile() {

    };

    render() {
        const context = {

        };
        const header = new Header();
        const root = stringToElement(template(context));
        root.style = styles;
        const wrapper = document.createElement('div');
        wrapper.classList.toggle('wrapper');
        wrapper.appendChild(root);
        wrapper.style.backgroundColor = '#F0F1F3';

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
        // document.body.style.backgroundColor = '#F0F1F3';

        return [ header.render(), wrapper ];
    }
}

export default Profile;