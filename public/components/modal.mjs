const config = {
    "author": 1,
    "city": "Москва",
    "delivery": true,
    "description": "Этот пост сгенерирован",
    "price": 1000,
    "safe": true,
    "title": "DAL-E"
}

export class Modal {
    #types = ['number', 'string', 'bool']

    constructor(){

    }

    #content() {
        const root = document.createElement('div')

        return root
    }

    #btnGroup() {
        const root = document.createElement('div')
        const accept = document.createElement('button')
        const decline = docuemnt.createElement('button')

        accept.textContent = 'Подтвердить'
        decline.textContent = 'Отменить'

        accept.classList = ['btn-primary']
        decline.classList = ['btn-neutral']

        return root
    }

    render (){
        const root = document.createElement('div')
        root.classList = ['modal']

        root.appendChild(this.#content())
        root.appendChild(this.#btnGroup())

        return root
    }
}