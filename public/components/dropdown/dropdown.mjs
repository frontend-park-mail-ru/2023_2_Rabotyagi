export class Dropdown {
    #parent
    #config
    
    constructor(parent, config) {
        this.#parent = parent
        this.#config = config
    }

    get config() {
        return this.#config;
    }

    get items() {
        return this.#config.items.map(([key, {text, clickEvent}]) => ({
            text,
            clickEvent,
        }));
    }

    render() {
        const template = Handlebars.templates['dropdown.hbs']

        const content = this.items.map(({text}, index) => {
            return [index, text]
        })

        const config = {
            search: false,
            items: {
                ref: 'profileBtn',
                content: content
            },
            id: this.#config.id
        }

        //#region legacy
        // const root = document.createElement('div')
        // const content = document.createElement('div')
        // root.classList = ['dropdown-menu-root']
        // content.classList = ['dropdown-menu-content']

        // this.items.map(({key, type, inner, style, events}, index) => {
        //     const dropdownElement = document.createElement(type);
        //     dropdownElement.innerHTML = inner;
        //     dropdownElement.style = style;
        //     dropdownElement.classList.add('dropdown__item');

        //     Object.entries(events).map(([key, delegate]) => {
        //         if (key != undefined && delegate != undefined) {
        //             dropdownElement.addEventListener(key, delegate)
        //         }
        //     })

        //     return dropdownElement;
        // }).forEach(element => {
        //     content.appendChild(element);
        // })
        // root.appendChild(content)
        
        // return root
        //#endregion

        this.#parent.innerHTML = this.#parent.innerHTML + template(config)

        this.items.map(({clickEvent}, index) => {
            document.querySelector('#profileBtn_'+index)?.addEventListener('click', clickEvent)
        })
    }
}