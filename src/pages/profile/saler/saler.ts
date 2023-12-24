import { Text } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Route, Router } from '../../../shared/services/router/Routing';
import { SalerProducts } from './products/products';
import { SalerComments } from './comments/comments';

export class ProfileSaler extends Component<never, never> {

    public render() {

        return createElement(
            'saler',
            {},
            createComponent(
                Router,
                {},
                createComponent(
                    Route,
                    {
                        path: /\/profile\/saler\?id=.+/,
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
                        path: /\/profile\/saler\/products/,
                    },
                    createComponent(
                        SalerProducts,
                        {},
                    ),
                ),
                createComponent(
                    Route,
                    {
                        path: /\/profile\/saler\/comments/,
                    },
                    createComponent(
                        SalerComments,
                        {},
                    ),
                ),
            ),
        );
    }
}
