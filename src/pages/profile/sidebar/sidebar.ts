import { Button, Image, Text } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { UserModel } from '../../../shared/models/userModel';
import UserStore from '../../../shared/store/UserStore';
import list from '../../../assets/icons/list.svg';
import heart from '../../../assets/icons/heart.svg';
import settings from '../../../assets/icons/settings.svg';
import cart from '../../../assets/icons/cart.svg';
import Navigate from '../../../shared/services/router/Navigate';

interface SidebarState extends UserModel {
}

export class Sidebar extends Component<never, SidebarState> {
    state: SidebarState = UserStore.getFields() as SidebarState;

    routeToProducts = () => Navigate.navigateTo('/profile/products');
    routeToOrders = () => Navigate.navigateTo('/profile/orders');
    routeToFavourites = () => Navigate.navigateTo('/profile/favourites');
    routeToSettings = () => Navigate.navigateTo('/profile/settings');

    public render() {

        return createElement(
            'sidebar',
            {
                class: 'profile-sidebar',
            },
            createComponent(
                Text,
                {
                    text: this.state.name ? this.state.name : this.state.email,
                    variant: 'subheader',
                },
            ),
            createElement(
                'div',
                {
                    style: 'align-self: stretch; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex',
                },
                (this.state.avatar) ?
                createComponent(
                    Image,
                    {
                        src: this.state.avatar,
                    },
                )
                :
                createElement(
                    'div',
                    {
                        style: 'width: 80px; height: 80px; position: relative; background: rgba(41, 44, 47, 0.25)',
                    },
                ),
            ),
            createComponent(
                Button,
                {
                    text: 'Объявления',
                    variant: 'neutral',
                    subvariant: 'tertiary',
                    leftIcon: {
                        content: list,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToProducts,
                },
            ),
            createComponent(
                Button,
                {
                    text: 'Заказы',
                    variant: 'neutral',
                    subvariant: 'tertiary',
                    leftIcon: {
                        content: cart,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToOrders,
                },
            ),
            createComponent(
                Button,
                {
                    text: 'Избранное',
                    variant: 'neutral',
                    subvariant: 'tertiary',
                    leftIcon: {
                        content: heart,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToFavourites,
                },
            ),
            createComponent(
                Button,
                {
                    text: 'Настройки',
                    variant: 'neutral',
                    subvariant: 'tertiary',
                    leftIcon: {
                        content: settings,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToSettings,
                },
            ),
            // createComponent(
            //     Button,
            //     {
            //         text: 'Поддержка',
            //         variant: 'neutral',
            //         subvariant: 'tertiary',
            //         leftIcon: {
            //             content: list,
            //             width: 24,
            //             height: 24,
            //         },
            //     },
            // ),
        );
    }
}

// <div class="menu">
//     <div class="breadcrumb"></div>
//     <span class="text-subheader">{{#if this.name}}
//             {{this.name}}
//         {{else}}
//             {{this.email}}
//         {{/if}}</span>
//     <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
//         {{#if this.avatar}}
//             <img style="width: 80px; height: 80px;" src="{{this.avatar}}" alt="" srcset="">
//         {{else}}
//             <div style="width: 80px; height: 80px; position: relative; background: rgba(41, 44, 47, 0.25)"></div>
//         {{/if}}
//     </div>
//     <div class="divider">
//     </div>
//     <div id="btn-products"></div>
//     <div id="btn-orders"></div>
//     <div id="btn-favorite"></div>
//     <div id="btn-settings"></div>
//     <div id="btn-support"></div>
// </div>
