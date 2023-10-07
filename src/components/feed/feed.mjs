/**
 * @module Feed
 */

import {Card} from "../card/Card.mjs"
import {ErrorMessageBox} from "../error/ErrorMessageBox.mjs";
import {Post} from "../../shared/api/post.mjs";
import {loaderRegular} from "../loader/loader.mjs";

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

    #Content() {
        const root = document.createElement('div');
        const loaderElement = loaderRegular();

        root.classList = ['feed-content'];
        root.appendChild(loaderElement);

        (async function () {
            try {
                const response = await Post.feed();
                setTimeout(() => {
                    root.removeChild(loaderElement);

                    response.body.forEach(elem => {
                        root.innerHTML += new Card(elem).render()
                    })
                }, 3000);
            } catch (err) {
                root.replaceChild(loaderElement, ErrorMessageBox(err));
            }
        })();

        return root;
    }

    render() {
        const root = document.createElement('div');

        root.appendChild(this.#Header());
        root.appendChild(this.#Content());

        return root;
    }
}
