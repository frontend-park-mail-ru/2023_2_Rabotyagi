import './products.scss';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Card } from '../../../components/card/Card';
import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';
import { ProductModelResponse } from '../../../shared/models/product';

interface ProfileProductsState {
    products: Array<ProductModelResponse>
}

export class ProfileProducts extends Component<never, ProfileProductsState> {
    state: ProfileProductsState = {
        products: [],
    };

    constructor() {
        super();

        this.getProducts();
    }

    async getProducts() {
        let resp;
        try {
            resp = await UserApi.getProducts();
            // if (this.variant === 'saler') {
            //     resp = await User.getProductsOfAnotherSaler(history.state.salerId);
            // }
            // else {
            //     resp = await User.getProducts();
            // }

        } catch (err) {
            console.error(err);
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                // throw statuses.USER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                // throw statuses.SERVER_MESSAGE;
                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // throw body.error;
                return;
            }
        }

        this.setState({
            products: resp.body,
        });
    }

    public render() {

        return createElement(
            'div',
            {class: 'products'},
            createElement(
                'container',
                {class: 'products-container'},
                ...this.state.products.map((product: ProductModelResponse) => createComponent(
                    Card,
                    {variant: 'profile', ...product},
                )),
            ),
        );
    }
}
