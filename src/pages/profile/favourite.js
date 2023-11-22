import { stringToElement } from '../../shared/utils/parsing';
import template from './templates/favourite.hbs';
import placeholder from './templates/placeholder.hbs';
import { User } from '../../shared/api/user';
import { loaderRegular } from '../../components/loader/loader';
import { ErrorMessageBox } from '../../components/error/errorMessageBox';
import { Card } from '../../components/card/card';
import './styles/favourite.scss';

class Favourite {
    constructor() {

    }

    async getFavs(container) {
        try {
            const resp = await User.getFavs();
            const body = (await resp.json()).body;

            switch (resp.status) {
                case 222:
                    throw body.error;
                default:
            }

            container.innerHTML = '';

            if (body.length > 0) {
                body.forEach((elem) => {
                    elem.variant = 'profile';
                    container.appendChild(new Card(elem).render());
                });
            }
            else {
                container.appendChild(stringToElement(placeholder()));
            }

            return;

        } catch (err) {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        }
    }

    render() {
        const root = stringToElement(template());
        root.appendChild(loaderRegular());

        this.getFavs(root);

        return [ root ];
    }
}

export default Favourite;
