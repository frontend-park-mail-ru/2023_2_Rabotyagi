import './profile.scss';
import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Header } from '../../components/header/header';
import { Route, Router } from '../../shared/services/router/Routing';
import { ProfileOrders } from './orders/orders';
import { ProfileProducts } from './products/products';
import { ProfileSettings } from './settings/settings';
import { Sidebar } from './sidebar/sidebar';

export class Profile extends Component<never, never> {

    public render() {

        return createElement(
            'div',
            {},
            createComponent(
                Header,
                {},
            ),
            createElement(
                'profile',
                {},
                createComponent(
                    Sidebar,
                    {},
                ),
                createComponent(
                   Router,
                   {},
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
                           path: new RegExp('/profile/orders$'),
                       },
                       createComponent(
                           ProfileOrders,
                           {},
                       ),
                   ),
               ),
            ),
        );
    }
}
