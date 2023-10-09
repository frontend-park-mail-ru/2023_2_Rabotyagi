export class ProfileBtn {
    render() {
        const root = document.createElement('div');
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

        root.innerHTML = template(context);

        return root.innerHTML;
    }
}
