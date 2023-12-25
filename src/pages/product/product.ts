import './product.scss';
import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Header } from '../../components/header/header';
import { Route, Router } from '../../shared/services/router/Routing';
import { ProductNew } from './new/productNew';
import { ProductBase } from './base/base';

export class Product extends Component<never, never> {
    public render() {

        return createElement(
            'product',
            {},
            createComponent(
                Header,
                {},
            ),
            createComponent(
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
                    createComponent(
                        ProductBase,
                        {},
                    ),
                ),
            ),
        );
    }
}
