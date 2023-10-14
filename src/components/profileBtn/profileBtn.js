import Template from './profileBtn.hbs'

export class ProfileBtn {
    render() {
        const template = Template;

        const context = {
            dropdown: {
                id: 'profile-dropdown',
                search: false,
                items: {
                    ref: 'profileBtn',
                    content: [
                        [ 'dropdown-btn-fav', 'Избранное' ],
                        [ 'dropdown-btn-profile', 'Профиль' ],
                        [ 'dropdown-btn-logout', 'Выйти' ],
                    ],
                },
            },
        };

        return template(context);
    }
}
