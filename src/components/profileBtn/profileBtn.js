import template from './profileBtn.hbs'
import styles from './profileBtn.css'
import { stringToElement } from '../../shared/utils/parsing';
import Dropdown from '../dropdown/dropdown';
import { store } from '../../shared/store/store';
import { deleteCookie } from '../../shared/utils/cookie';

class ProfileBtn {
    render() {
        const dropdownContext = {
            id: 'profileBtn-dropdown',
            search: false,
            items: [
                [ 'dropdown-btn-fav', 'Избранное' ],
                [ 'dropdown-btn-profile', 'Профиль' ],
                [ 'dropdown-btn-logout', 'Выйти' ],
            ],
        };

        const root = stringToElement(template());
        let dropdown = new Dropdown(dropdownContext);
        root.querySelector('#profileBtn-dropdown').replaceWith(dropdown.render());
        dropdown = root.querySelector('#profileBtn-dropdown');

        function openDropdown() {
            dropdown.classList.toggle(
                'hidden'
            );
            document.body.removeEventListener('click', openDropdown);
        }
        
        root.addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                dropdown.classList.toggle(
                    'hidden'
                );

                document.body.addEventListener('click', openDropdown);
            }
        );

        root.querySelector('#dropdown-btn-logout').addEventListener(
            'click',
            (e) => {
                e.stopPropagation();
                store.user.clear();
                deleteCookie('access_token');
                window.Router.navigateTo('/signin');
            }
        );

        root.querySelector('#dropdown-btn-profile').addEventListener('click', (e) => {
            e.stopPropagation();
            window.Router.navigateTo('/profile/products');
        });


        root.style = styles;

        return root;
    }
};

export default ProfileBtn;
