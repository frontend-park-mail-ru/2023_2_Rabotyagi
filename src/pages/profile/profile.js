import { stringToElement } from '../../shared/utils/parsing.js';
import template from './profile.hbs'
import styles from './profile.css'
import { Header } from '../../components/header/header.js';

class Profile {
    constructor() {

    }

    async getProfile() {

    };

    render() {
        const context = {

        };
        const header = new Header();
        const root = stringToElement(template(context));
        root.style = styles;

        return [ header.render(), root ];
    }
}

export default Profile;