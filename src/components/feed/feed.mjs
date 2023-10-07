/**
 * @module Feed
 */

import {PostCard} from "../card/card.mjs"
import {errorMessageBox} from "../error/errorMessageBox.mjs";

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
    // {
    //     const PostsService = {
    //         getList:(params)=>{
    //              return window.Ajax.get("/post/list", params)
    //         }
    //     }


    //     try {
    //         const loaderElement = new Loader().render();
    //         root.appendChild(loaderElement);

    //         const response = await PostsService.getList({page: 1 });
    //         const postsElement = new Post(response.list).render();
    //         root.replaceChild(postsElement, loaderElement);
    //     } catch (err) {
    //         const errorElement = new ErrorMessage("Ошибка загрузки объявлений").render()
    //         root.replaceChild(errorElement, loaderElement);
    //     }

    // }
    async #Content() {
        const root = document.createElement('div');

        root.classList = ['feed-content'];
        try {
            const response = await POST_SERVICE.feed();
            response.body.forEach((info) => {
                let card = new PostCard(info);
                root.appendChild(card.render());
            })

        } catch (err) {
            root.appendChild(errorMessageBox(err));
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
