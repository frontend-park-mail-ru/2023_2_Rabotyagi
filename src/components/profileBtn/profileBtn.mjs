import {stringToElement} from "../../shared/utils/parsing.mjs";

export class ProfileBtn {
    render() {
        const template = Handlebars.templates['profileBtn.hbs'];
        Handlebars.registerPartial('dropdown', Handlebars.templates['dropdown.hbs']);

        const context = {
            dropdown: {
                id: 'profile-dropdown',
                search: false,
                items: {
                    ref: 'profileBtn',
                    content: [
                        [
                            'dropdown-btn-fav', 'Избранное'
                        ],
                        [
                            'dropdown-btn-profile', 'Профиль'
                        ],
                        [
                            'dropdown-btn-logout', 'Выйти'
                        ]
                    ]
                }
            }
        }

        return stringToElement(template(context));
    }
}
