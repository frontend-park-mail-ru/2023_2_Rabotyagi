import './profile.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Header } from '../../components/header/header';
import { Route, Router } from '../../shared/services/router/Routing';

import { ProfileProducts } from './products/products';
import { ProfileSettings } from './settings/settings';
import { ProfileFavourites } from './favourites/favourites';
import { ProfileOrders } from './orders/orders';
import { ProfileSaler } from './saler/saler';
import { ProfileComments } from './comments/comments';
import { Sidebar } from './sidebar/sidebar';

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
                                ProfileOrders,
                                {},
                           ),
                       ),
                       createComponent(
                        Route,
                        {
                            path: new RegExp('/profile/comments.*'),
                        },
                        createComponent(
                            ProfileComments,
                            {},
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
