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
                items: [
                    {
                        text: 'Избранное',
                        clickEvent: function(e) {

                        }
                    },
                    {
                        text: 'Профиль',
                        clickEvent: function(e) {

                        }
                    },
                    {
                        text: 'Выйти',
                        clickEvent: function(e) {
                            store.user.logout()
                            store.activePage = 'signin'
                            store.pages['signin']()
                        }
                    },
                ]
            },
            id: 'profile-dropdown'
                
        }
        
        this.#parent.innerHTML = this.#parent.innerHTML + template(config)

        // const container = document.querySelector('.profile-container')
        // new Dropdown(container, config.dropdownConf).render()

        // document.querySelector('#profile-dropdown')?.addEventListener('click', (e) => {
        //     e.stopPropagation()
        //     e.target.classList.toogle('hidden')
        // })
    }
}
