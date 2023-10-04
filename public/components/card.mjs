export class PostCard {
    #title
    #desc
    #city
    #price

    constructor(title, desc, city, price) {
        this.#title = title
        this.#desc = desc
        this.#city = city
        this.#price = price
    }


    render () {
        const root = document.createElement('div')
        const title = document.createElement('span')
        const desc = document.createElement('span')
        const city = document.createElement('span')
        const price = document.createElement('span')

        title.textContent = 'title ' + this.#title
        desc.textContent = 'desc ' + this.#desc
        city.textContent = 'city ' + this.#city
        price.textContent = 'price ' + this.#price

        root.classList = ['post-card']
        root.appendChild(title)
        root.appendChild(desc)
        root.appendChild(city)
        root.appendChild(price)

        return root
    }
}