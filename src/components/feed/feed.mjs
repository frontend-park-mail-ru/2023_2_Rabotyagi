/**
 * @module Feed
 */

import {Card} from "../card/Card.mjs"
import {ErrorMessageBox} from "../error/ErrorMessageBox.mjs";
import {Post} from "../../shared/api/post.mjs";

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {

    constructor() {
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

    async #Content() {
        const root = document.createElement('div');

        root.classList = ['feed-content'];
        try {
            const response = await Post.feed();
            response.body.forEach((info) => {
                root.appendChild(new Card(info).render());
            })

        } catch (err) {
            root.appendChild(ErrorMessageBox(err));
        }

        return root;
    }

    render() {
        const root = document.createElement('div');

        root.appendChild(this.#Header());
        this.#Content().then(elem => {
            root.appendChild(elem);
        })


        return root;
    }
}
