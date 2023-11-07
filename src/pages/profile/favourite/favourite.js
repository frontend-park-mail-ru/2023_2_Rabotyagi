import { stringToElement } from '../../../shared/utils/parsing';
import template from './favourite.hbs';
import { UserApi } from '../../../shared/api/user';
import { loaderRegular } from '../../../components/loader/loader';
import { ErrorMessageBox } from '../../../components/error/errorMessageBox';
import placeholder from './placeholder.hbs';
import { Card } from '../../../components/card/card';
import './favourite.scss';


class Favourite {
    constructor() {

    }

    async getFavs(container) {
        try {
            const resp = await UserApi.getFavs();
            const body = await resp.json();

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