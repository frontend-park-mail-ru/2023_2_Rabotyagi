import './productNew.scss';

import { FileInput, NumberInput, Text, TextArea, TextInput, BooleanInput } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Header } from '../../../components/header/header';
import { Select } from '../../../components/baseComponents/select/select';

export class ProductNew extends Component<never,never> {
    formSubmit = async(e: Event) => {

    };

    public render() {

        return createElement(
            'product',
            {},
            createComponent(
                Header,
                {},
            ),
            createElement(
                'form',
                {
                    class: 'content-add',
                    onsubmit: this.formSubmit,
                },
                createComponent(
                    Text,
                    {
                        text: 'Название',
                    },
                ),
                createComponent(
                    TextInput,
                    {},
                ),
                createComponent(
                    Text,
                    {
                        text: 'Изображения',
                    },
                ),
                createComponent(
                    FileInput,
                    {
                        accept: '.png, .jpg, .jpeg',
                        multiple: true,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Город',
                    },
                ),
                createComponent(
                    Select,
                    {
                        items: [],
                        key: 'id',
                        value: 'name',
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Описание',
                    },
                ),
                createComponent(
                    TextArea,
                    {},
                ),
                createComponent(
                    Text,
                    {
                        text: 'Категория',
                    },
                ),
                createComponent(
                    Select,
                    {
                        items: [],
                        key: 'id',
                        value: 'name',
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Цена',
                    },
                ),
                createComponent(
                    NumberInput,
                    {},
                ),
                createComponent(
                    Text,
                    {
                        text: 'Доступное кол-во товара',
                    },
                ),
                createComponent(
                    NumberInput,
                    {},
                ),
                createComponent(
                    Text,
                    {
                        text: 'Безопасная сделка',
                    },
                ),
                createComponent(
                    BooleanInput,
                    {

                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Доставка',
                    },
                ),
                createComponent(
                    BooleanInput,
                    {},
                ),
            ),
        );
    }
}

// <div class="product">
//     {{#if isAuth}}
//         <form class="content-add">
//         <div class="body">
//             {{!-- <img class="image" src="{{this.image}}" alt="" srcset=""> --}}
//             <span class="text-regular">Название</span>
//             <input name="title" class="text-regular searchField" type="text">
//             <span class="text-regular">Изображения</span>
//             <input name="images" type="file" id="input-images" multiple accept=".png, .jpg, .jpeg">
//             <span class="text-regular">Город</span>
//             <select name="city_id">
//                 {{#each cities}}
//                 <option value="{{this.id}}">
//                     <span class="text-regular">{{this.name}}</span>
//                 </option>
//                 {{/each}}
//             </select>
//             {{!-- <input name="city" class="text-regular searchField" type="text"> --}}
//             <span class="text-regular">Описание</span>
//             <textarea name="description" class="textArea text-regular" type="text"></textarea>
//             <span class="text-regular">Категория</span>
//             <select name="category_id">
//                 {{#each categories}}
//                 <option value="{{this.id}}">
//                     <span class="text-regular">{{this.name}}</span>
//                 </option>
//                 {{/each}}
//             </select>
//             <span class="text-regular">Цена</span>
//             <input name="price" class="text-regular searchField" type="number" min="0" oninput="validity.valid||(value='');">
//             <span class="text-regular">Доступное кол-во товара</span>
//             <input name="available_count" class="text-regular searchField" type="number">
//             <span class="text-regular">Безопасная сделка</span>
//             <input name="safe_deal" class="text-regular searchField" type="checkbox">
//             <span class="text-regular">Доставка</span>
//             <input name="delivery" class="text-regular searchField" type="checkbox">
//         </div>
//         <div class="btn-group">
//             <div id="btn-submit"></div>
//         </div>
//         <div id="errorBox"></div>
//         {{!-- <button id="fav"></button>
//         <img src="" alt="" srcset="">
//         <div class="info">

//         </div> --}}

//     </form>
//     {{else}}
//     <span class="text-regular">Вы не авторизированы</span>
//     {{/if}}

// </div>
