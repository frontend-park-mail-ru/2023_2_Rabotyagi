import './profile.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Header } from '../../components/header/header';
import { Route, Router } from '../../shared/services/router/Routing';

import { ProfilePage } from './profilePage/profilePage';
import { ProfileProducts } from './products/products';
import { ProfileSettings } from './settings/settings';
import { ProfileFavourites } from './favourites/favourites';
import { ProfileSaler } from './saler/saler';
import { Sidebar } from './sidebar/sidebar';

import UserStore from '../../shared/store/user';

import Navigate from '../../shared/services/router/Navigate';
import { OrderApi } from '../../shared/api/order';
import { CommentApi } from '../../shared/api/comment';

export class Profile extends Component<never, never> {

    public render() {

        return createElement(
            'div',
            { class: 'wrapper-profile-page' },
            createComponent(
                Header,
                {},
            ),
            createElement(
                'profile',
                { class: 'wrapper-profile' },
                createElement(
                    'div',
                    { class: 'profile-info' },
                    createComponent(
                        Sidebar,
                        {},
                    ),
                    createComponent(
                       Router,
                       { },
                       createComponent(
                           Route,
                           {
                               path: new RegExp('/profile$'),
                           },
                           createElement(
                               'dashboard',
                               {},
                           ),
                       ),
                       createComponent(
                           Route,
                           {
                               path: new RegExp('/profile/settings$'),
                           },
                           createComponent(
                               ProfileSettings,
                               {},
                           ),
                       ),
                       createComponent(
                           Route,
                           {
                               path: new RegExp('/profile/favourites$'),
                           },
                           createComponent(
                               ProfileFavourites,
                               {},
                           ),
                       ),
                       createComponent(
                           Route,
                           {
                               path: new RegExp('/profile/products$'),
                           },
                           createComponent(
                               ProfileProducts,
                               {},
                           ),
                       ),
                       createComponent(
                           Route,
                           { 
                               path: new RegExp('/profile/orders.*'),
                           },
                           createComponent(
                               ProfilePage,
                               {
                                  title: 'Заказы',
                                  options: [
                                    {
                                        name: 'Покупки',
                                        link: '/profile/orders/buy',
                                        empty_message: 'Вы пока ничего не купили.\nВсе купленные вами товары будут отображаться на этой вкладке',
                                        empty_button_text: 'В корзину',
                                        empty_button_onclick: () => { Navigate.navigateTo('/cart'); },
                                        api_function: OrderApi.getBuyed,
                                    },
                                    {
                                        name: 'Продажи',
                                        link: '/profile/orders/sell',
                                        empty_message: 'У вас пока ничего не купили.\nВсе проданные вами товары будут отображаться на этой вкладке',
                                        empty_button_text: 'Разместить объявление',
                                        empty_button_onclick: () => { Navigate.navigateTo('/product/new'); },
                                        api_function: OrderApi.getSold,
                                    }
                                  ],
                                  card_variant: 'sold',
                               }
                           ),
                       ),
                       createComponent(
                        Route,
                        { 
                            path: new RegExp('/profile/comments.*'),
                        },
                        createComponent(
                            ProfilePage,
                            {
                                title: 'Отзывы',
                                grid_x_repeat: 1,
                                card_variant: 'comment',
                                options: [
                                    {
                                        name: 'Отзывы',
                                        link: '/profile/comments',
                                        empty_message: 'Никто пока не оставил вам отзыв.\nВсе оставленные вам отзывы будут отображаться на этой вкладке',
                                        api_function: CommentApi.getComments,
                                        api_params: UserStore.getFields()?.id,
                                    },
                                ],
                            }
                        ),
                    ),
                       createComponent(
                           Route,
                           {
                               path: new RegExp('/profile/saler.+'),
                           },
                           createComponent(
                               ProfileSaler,
                               {},
                           ),
                       ),
                   ),
                ),
            ),
        );
    }
}
