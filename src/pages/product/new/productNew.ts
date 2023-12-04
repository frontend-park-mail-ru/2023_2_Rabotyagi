import './productNew.scss';

import { FileInput, NumberInput, Text, TextArea, TextInput, BooleanInput, Button } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Header } from '../../../components/header/header';
import { Select } from '../../../components/baseComponents/select/select';

interface ProductNewState {
    title: string,
    desc: string,
    city: number,
    category: number,
    price: number,
    availableCount: number,
    safeDeal: boolean,
    delivery: boolean,

}

export class ProductNew extends Component<never,ProductNewState> {
    state: ProductNewState = {
        title: '',
        desc: '',
        city: -1,
        category: -1,
        price: -1,
        availableCount: -1,
        safeDeal: false,
        delivery: false,
    };

    validate = () => {
        if (this.state.title.trim() === '') {
            return 'Title must be not empty string';
        }

        if (this.state.desc.trim() === '') {
            return 'Desc must be not empty string';
        }

        if (this.state.city === -1) {
            return 'City must be chosen';
        }

        if (this.state.category === -1) {
            return 'Category must be chosen';
        }

        if (this.state.price === -1) {
            return 'Price must be chosen';
        }

        if (this.state.availableCount === -1) {
            return 'available count must be chosen';
        }

        return null;
    };
    formSubmit = async(e: Event) => {
        e.preventDefault();

        const res = this.validate();

        if (!res) {

            console.log(res);
        }
    };
    fileInputEvent = () => {};

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
                createElement(
                    'div',
                    {
                        class: 'content-add-body',
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
                        {
                            oninput: (e: Event) => this.state.title = (e.target as HTMLInputElement).value,
                        },
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
                            oninput: this.fileInputEvent,
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
                            events: {
                                onchange: (e: Event) => this.state.city = Number((e.target as HTMLInputElement).value),
                            },
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
                        {
                            oninput: (e: Event) => this.state.desc = (e.target as HTMLInputElement).value,
                        },
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
                            events: {
                                onchange: (e: Event) => this.state.category = Number((e.target as HTMLInputElement).value),
                            },
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
                        {
                            oninput: (e: Event) => this.state.price = Number((e.target as HTMLInputElement).value),
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Доступное кол-во товара',
                        },
                    ),
                    createComponent(
                        NumberInput,
                        {
                            oninput: (e: Event) => this.state.availableCount = Number((e.target as HTMLInputElement).value),
                        },
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
                            oninput: (e: Event) => this.state.safeDeal = Boolean((e.target as HTMLInputElement).value),
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
                        {
                            oninput: (e: Event) => this.state.delivery = Boolean((e.target as HTMLInputElement).value),
                        },
                    ),
                ),
                createElement(
                    'div',
                    {
                        class: 'content-add-btn-group',
                    },
                    createComponent(
                        Button,
                        {
                            text: 'Создать',
                            variant: 'primary',
                            style: 'width: 100%',
                        },
                    ),
                    // createComponent(
                    //     Button,
                    //     {
                    //         text: 'Очистить',
                    //         variant: 'neutral',
                    //         subvariant: 'primary',
                    //         style: 'width: 100%',
                    //     },
                    // ),
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
