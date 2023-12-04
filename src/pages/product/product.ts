import { Text } from '../../components/baseComponents/index';
import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Route, Router } from '../../shared/services/router/Routing';
import { ProductNew } from './new/productNew';

export class Product extends Component<never, never> {
    public render() {

        return createComponent(
            Router,
            {},
            createComponent(
                Route,
                {
                    path: /\/product\/new$/,
                },
                createComponent(
                    ProductNew,
                    {},
                ),
            ),
            createComponent(
                Route,
                {
                    path: /\/product\?id=.+/,
                },
                createElement(
                    'product',
                    {},
                    createComponent(
                        Text,
                        {
                            text: 'Product',
                        },
                    ),
                ),
            ),
        );
    }
}
