import { Component } from '../../components/baseComponents/snail/component';
import { createComponent } from '../../components/baseComponents/snail/vdom/VirtualDOM';
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
                    path: new RegExp('/product/new$'),
                },
                createComponent(
                    ProductNew,
                    {},
                ),
            ),
        );
    }
}
