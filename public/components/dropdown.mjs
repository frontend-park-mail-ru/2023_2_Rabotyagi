export class Dropdown {
    #config
    
    constructor(config) {
        this.#config = config
    }

    get config() {
        return this.#config;
    }

    get items() {
        return Object.entries(this.config).map(([key, {type, inner, style, events}]) => ({
            key,
            type,
            inner,
            style,
            events
        }));
    }

    render() {
        const root = document.createElement('div')
        const content = document.createElement('div')
        root.classList = ['dropdown-menu-root']
        content.classList = ['dropdown-menu-content']

        this.items.map(({key, type, inner, style, events}, index) => {
            const dropdownElement = document.createElement(type);
            dropdownElement.innerHTML = inner;
            dropdownElement.style = style;
            dropdownElement.classList.add('dropdown__item');

            Object.entries(events).map(([key, delegate]) => {
                if (key != undefined && delegate != undefined) {
                    dropdownElement.addEventListener(key, delegate)
                }
            })

            return dropdownElement;
        }).forEach(element => {
            content.appendChild(element);
        })
        root.appendChild(content)
        
        return root
    }
}