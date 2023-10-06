import API from "../../api/api.mjs"

export class Feed {
    // #items_arr

    // get #items() {return this.#items_arr}
    // set #items(arr) {this.#items_arr = arr}

    constructor (){

        this.items = []

    }

    async #getPosts() {
        let postsList = await Ajax.getUsingFetch({
            url: API.ADRESS_BACKEND + API.GET_POST_LIST + new URLSearchParams({count: 2}),
        })
        return postsList
    }

    #Header() {
        const root = document.createElement('div')

        root.classList = ['feed']
        const header = document.createElement('span')
        header.textContent = 'Все объявления'

        root.appendChild(header)

        return root
    }

    #Content() {
        const root = document.createElement('div')

        root.classList = ['feed-content']
        this.#getPosts()
        .then(response => {
            response.Body.forEach((info) => {
                let card = new PostCard(root, info)
                card.render()
            })
        })
        // console.log(items)
        // let posts = this.#state.items.map(elem => {
        //     console.log(elem)
        //     let card = new PostCard(title, description, city, price)
        //     // root.appendChild(card.render())
        //     // console.log(card)
        //     return card.render()
        // })

        // posts.forEach(elem => {
        //     root.appendChild(elem)
        // })

        return root
    }

    render() {
        const root = document.createElement('div')
        
        root.appendChild(this.#Header())
        root.appendChild(this.#Content())

        return root
    }
}