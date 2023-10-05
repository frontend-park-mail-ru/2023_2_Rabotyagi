import Handlebars from "handlebars"

export class PostCard {
    #title
    #desc
    #city
    #price

    constructor(title, city, price) {
        this.#title = title
        // this.#desc = desc
        this.#city = city
        this.#price = price
    }


    render () {
        const template = Handlebars.templates(['card.hbs'])
        // const root = document.createElement('div')
        // const title = document.createElement('span')
        // const desc = document.createElement('span')
        // const city = document.createElement('span')
        // const price = document.createElement('span')
        const context = {
            badges: {
                safeDeal: false,
                delivery: false,
                city: this.#city
            },
            cardImage: {
                url: null,
                alt: 'картинка'
            },
            cardInfo: {
                price: this.#price,
                title: this.#title
            }
        }

        // title.textContent = 'title ' + this.#title
        // desc.textContent = 'desc ' + this.#desc
        // city.textContent = 'city ' + this.#city
        // price.textContent = 'price ' + this.#price

        // root.classList = ['post-card']
        // root.appendChild(title)
        // root.appendChild(desc)
        // root.appendChild(city)
        // root.appendChild(price)

        // return root
        return template(context)
    }
}