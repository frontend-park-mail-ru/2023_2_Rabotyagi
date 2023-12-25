import { Text } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Route, Router } from '../../../shared/services/router/Routing';
import { SalerProducts } from './products/products';
import { SalerComments } from './comments/comments';
import { Header } from '../../../components/header/header';
import { SalerSidebar } from './sidebar/sidebar';

export class SalerProfile extends Component<never, never> {

    public render() {

        return createElement(
            'div',
            { class: 'wrapper-saler-page' },
            createComponent(
                Header,
                {},
            ),
            createElement(
                'saler',
                { class: 'wrapper-saler' },
                createElement(
                    'div',
                    { class: 'saler-info' },
                    createComponent(
                        SalerSidebar,
                        {},
                    ),
                    createComponent(
                        Router,
                        {},
                        createComponent(
                            Route,
                            {
                                path: /\/saler\?id=.+/,
                            },
                            createComponent(
                                Text,
                                {
                                    text: 'profile',
                                    variant: 'header',
                                },
                            ),
                        ),
                        createComponent(
                            Route,
                            {
                                path: /\/saler\/products/,
                            },
                            createComponent(
                                SalerProducts,
                                {},
                            ),
                        ),
                        createComponent(
                            Route,
                            {
                                path: /\/saler\/comments/,
                            },
                            createComponent(
                                SalerComments,
                                {},
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}
