/**
 * @module Feed
 */

import {PostCard} from "../card/card.mjs"

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {

    constructor(parent) {
        this.items = [];
    }

    /**
     * @async
     * @description Посылает запрос на бек для получения 20 постов
     * @returns Массив постов
     */
    #getPosts() {}


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
        POST_SERVICE.feed().then(data => {
            data ?. body.forEach((info) => {
                let card = new PostCard(root, info)
                card.render()
            })
        })

        return root
    }

    render() {
        const root = document.createElement('div')

        root.appendChild(this.#Header())
        root.appendChild(this.#Content())

        return root;
    }
}
