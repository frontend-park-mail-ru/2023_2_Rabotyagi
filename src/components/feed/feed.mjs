/**
 * @module Feed
 */

import API from "../../shared/constants/api.mjs"
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
    #getPosts() {
        return Ajax.get({
            url: API.ADRESS_BACKEND + API.GET_POST_LIST,
            params: {
                count: 20
            }

        })
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
        this.#getPosts().then(data => {
            data.body.forEach((info) => {
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
