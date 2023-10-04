import { Dropdown } from "../dropdown.mjs"

export class Feed {
    constructor (){

    }

    async #getPosts() {
        let promise = await fetch('http://localhost:8080/api/v1/post/get_list?' + new URLSearchParams({count: 20}), {
            method: 'GET',
        })

        promise.json()
        .then(response => {
            if (response.status == 200) {
                console.log(response.Body)
            }
        })
        // console.log(response)
    }

    #Header() {
        const root = document.createElement('div')

        root.classList = []
        const header = document.createElement('span')
        header.textContent = 'Все объявления'

        root.appendChild(header)

        return root
    }

    #Content() {
        const root = document.createElement('div')

        root.classList = []
        this.#getPosts()

        return root
    }

    render() {
        const root = document.createElement('div')
        
        root.appendChild(this.#Header())
        root.appendChild(this.#Content())

        return root
    }
}