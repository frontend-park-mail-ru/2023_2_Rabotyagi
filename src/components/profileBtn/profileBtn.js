import template from './profileBtn.hbs'
import { stringToElement } from '../../shared/utils/parsing';
import Dropdown from '../dropdown/dropdown';
import { store } from '../../shared/store/store';
import { deleteCookie } from '../../shared/utils/cookie';
import Router from '../../shared/services/router';

class ProfileBtn {
    render() {
        const dropdownContext = {
            id: 'profile-dropdown',
            search: false,
            items: [
                [ 'dropdown-btn-fav', 'Избранное' ],
                [ 'dropdown-btn-profile', 'Профиль' ],
                [ 'dropdown-btn-logout', 'Выйти' ],
            ],
        };

        const root = stringToElement(template());
        const dropdown = new Dropdown(dropdownContext);
        root.querySelector('#profile-dropdown').replaceWith(dropdown.render());

        root.querySelector('#dropdown-btn-logout')?.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                store.user.clear();
                deleteCookie('access_token');
                Router.navigateTo('/signin');
            }
        );

        root.querySelector('#dropdown-btn-profile')?.addEventListener('click', (e) => {
            e.stopPropagation();
            Router.navigateTo('/profile');
        });

        return root;
    }
};

export default ProfileBtn;
