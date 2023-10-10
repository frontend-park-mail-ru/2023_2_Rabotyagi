/**
 * @module Feed
 */

import {Card} from "../card/card.mjs";
import {ErrorMessageBox} from "../error/errorMessageBox.mjs";
import {Post} from "../../shared/api/post.mjs";
import {loaderRegular} from "../loader/loader.mjs";

/**
 * @class Блок с объявлениями
 * @description Получает посты с бекенда и формирует коллекцию для представления
 */
export class Feed {
    render() {
        let root = document.createElement('div');
        const template = Handlebars.templates['feed.hbs'];

        const context = {
            feedName: 'Все объявления',
        }

        root.innerHTML = template(context);

        root = root.firstChild;

        const container = root.querySelector('div.feed-content');
        container.appendChild(loaderRegular());

        Post.feed().then(response => {
            if (response.status == 200) {
                container.innerHTML = '';
                response.body.forEach(elem => {
                    container.appendChild(new Card(elem).render());
                })
            } else {
                throw response.body.error;
            }
        }).catch(err => {
            container.innerHTML = '';
            container.appendChild(ErrorMessageBox(err));
        })

        return root;
    }
}
