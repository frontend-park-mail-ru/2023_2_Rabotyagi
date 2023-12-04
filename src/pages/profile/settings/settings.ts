import './settings.scss';
import { Button, FileInput, Text, TextInput } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

export class ProfileSettings extends Component<never, never> {
    formSubmit = async(e: Event) => {
        e.preventDefault();
    };

    public render() {

        return createElement(
            'settings',
            {
                class: 'settings',
            },
            createElement(
                'form',
                {
                    class: 'settings-content',
                    onsubmit: this.formSubmit,
                },
                createComponent(
                    Text,
                    {
                        text: 'Аватарка',
                    },
                ),
                createComponent(
                    FileInput,
                    {
                        accept: '.png, .jpg, .jpeg',
                        multiple: false,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Имя',
                    },
                ),
                createComponent(
                    TextInput,
                    {

                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Телефон',
                    },
                ),
                createComponent(
                    TextInput,
                    {

                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Почта',
                    },
                ),
                createComponent(
                    TextInput,
                    {

                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Сохранить',
                        variant: 'primary',
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Отменить',
                        variant: 'neutral',
                        subvariant: 'primary',
                    },
                ),
            ),
        );
    }
}

// <div class="settings-container">
//     <form class="content">
//         <span class="text-regular">Аватарка</span>
//         <input name="avatar" type="file" accept=".png, .jpg, .jpeg">
//         <span class="text-regular">Имя</span>
//         <input name="name" class="text-regular searchField" type="text" placeholder="{{this.name}}">
//         <span class="text-regular">Телефон</span>
//         <input name="phone" class="text-regular searchField" placeholder="+7 ___ ___ __ __" data-slots="_" type="text" placeholder="{{this.phone}}">
//         <span class="text-regular">Почта</span>
//         <input name="email" class="text-regular searchField" type="email" placeholder="{{this.email}}">
//         <div id="btn-submit"></div>
//         <div id="btn-cancel"></div>
//     </form>
//     <div id="errorBox"></div>
// </div>
