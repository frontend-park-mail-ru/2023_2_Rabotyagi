export class PostCard {
    #parent
    #title
    #desc
    #city
    #price

    constructor(parent, {title, city, price}) {
        this.#parent = parent
        this.#title = title
        // this.#desc = desc
        this.#city = city
        this.#price = price
    }


    render () {
        const template = Handlebars.templates['card.hbs']
        
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

        this.#parent.innerHTML = this.#parent.innerHTML + template(context)
    }
}