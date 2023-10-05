import { store } from "../store.mjs";
// import { Dropdown } from "../dropdown/dropdown.mjs";

export class Profile {
    #parent

    constructor (parent) {
        this.#parent = parent
    }

    render() {
        // Handlebars.registerPartial('dropdown', Handlebars.templates['dropdown.hbs'])
        const template = Handlebars.templates['profileBtn.hbs']

        const config = {
            dropdownConf: {
                id: 'profile-dropdown',
                search: false,
                items: {
                    ref: 'profileBtn',
                    content: [
                        ['dropdown-btn-fav', 'Избранное'],
                        ['dropdown-btn-profile', 'Профиль'],
                        ['dropdown-btn-logout', 'Выйти']
                        // {
                        //     text: 'Избранное',
                        //     clickEvent: function(e) {
    
                        //     }
                        // },
                        // {
                        //     text: 'Профиль',
                        //     clickEvent: function(e) {
    
                        //     }
                        // },
                        // {
                        //     text: 'Выйти',
                        //     clickEvent: function(e) {
                        //         store.user.logout()
                        //         store.activePage = 'signin'
                        //         store.pages['signin']()
                        //     }
                        // },
                    ]
                },
            },
                
        }
        
        this.#parent.innerHTML = this.#parent.innerHTML + template(config)

        // const container = document.querySelector('.profile-container')
        // new Dropdown(container, config.dropdownConf).render()

        const pd = document.querySelector('#profile-dropdown')
        console.log(pd)
        pd?.addEventListener('click', (e) => {
            // e.stopPropagation()
            console.log(e.target)
            e.target.classList.toogle('hidden')
        })
    }
}
