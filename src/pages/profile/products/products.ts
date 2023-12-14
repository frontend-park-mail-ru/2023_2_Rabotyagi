import './products.scss';
import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Card } from '../../../components/card/Card';
import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';
import { ProfilePlaceholder } from '../placeholder';

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
        const products: VDomComponent[] = [];

        if (this.state.products && this.state.products.length !== 0) {
            this.state.products.forEach((product: ProductModelResponse) => products.push(
                createComponent(
                    Card,
                    {variant: 'profile', ...product},
                )),
            );
        }
        else {
            products.push(
                createComponent(
                    ProfilePlaceholder,
                    {
                        text: 'Все созданные вами объявления будут на этой вкладке',
                    },
                ),
            );
        }

        return createElement(
            'div',
            {class: 'products'},
            createElement(
                'container',
                {class: 'products-container'},
                ...products,
            ),
        );
    }
}
