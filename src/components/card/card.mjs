export class PostCard {
    #title;
    #desc;
    #city;
    #price;
    constructor({title, city, price}) {
        this.#title = title
        // this.#desc = desc
        this.#city = city
        this.#price = price
    }


    render() {
        const template = Handlebars.templates['card.hbs'];

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

        return template(context);
    }
}
