import './view.scss';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { ProductSidebar } from './sidebar';
import { ProductBaseView } from './view/view';
import { Product } from '../../../shared/api/product';
import { ResponseStatusChecker } from '../../../shared/constants/response';
import { ProductModelResponse } from '../../../shared/models/product';
import { UserApi } from '../../../shared/api/user';
import { UserModel } from '../../../shared/models/user';
import { ProductBaseEdit } from './edit/edit';

interface ProductBaseState {
    product?: ProductModelResponse | null,
    saler?: UserModel | null,
    editMode?: boolean
}

export class ProductBase extends Component<never, ProductBaseState> {
    state: ProductBaseState = {
        product: null,
        saler: null,
        editMode: false,
    };

    constructor() {
        super();

        this.getProduct();
    }

    async getUser(id: number) {
        let respSaler;

        try {
            respSaler = await UserApi.getProfile(id);
        }
        catch (err) {

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(respSaler)) {
            if (ResponseStatusChecker.IsBadFormatRequest(respSaler)) {
                // this.setError(ResponseMessage.USER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(respSaler)) {
                // this.setError(ResponseMessage.SERVER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsUserError(respSaler)) {
                // this.setError(respPost.body.error);

                return;
            }
        }

        const bodySaler: UserModel = respSaler.body;

        this.setState({
            saler: bodySaler,
        });

        return;
    }

    async getProduct() {
        const productId = Number((new URLSearchParams(location.search)).get('id'));
        let respPost;

        try {
            respPost = await Product.get(productId);

        } catch (err) {

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(respPost)) {
            if (ResponseStatusChecker.IsBadFormatRequest(respPost)) {
                // this.setError(ResponseMessage.USER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(respPost)) {
                // this.setError(ResponseMessage.SERVER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsUserError(respPost)) {
                // this.setError(respPost.body.error);

                return;
            }
        }

        const respBody: ProductModelResponse = respPost.body;

        this.setState({
            product: respBody,
        });

        this.getUser(respBody.saler_id);
    }

    switchEditMode = () => this.setState({editMode: !this.state.editMode});

    isEditMode = () => this.state.editMode;

    public render() {
        let content;
        if (!this.state.editMode) {
            content = createComponent(
                ProductBaseView,
                {...this.state.product},
            );
        }
        else {
            content = createComponent(
                ProductBaseEdit,
                {...this.state.product},
            );
        }

        return createElement(
            'view',
            {
                class: 'product',
            },
            (this.state.product) ?
            content
            :
            createElement(
                'div1',
                {},
            ),
            (this.state.saler) ?
            createComponent(
                ProductSidebar,
                {
                    ...this.state.saler,
                    price: this.state.product?.price ? this.state.product.price : 0,
                    parent: this,
                    // callbacks: {
                    //     switchEditMode: this.switchEditMode,
                    //     isEditMode: this.isEditMode,
                    // },
                },
            )
            :
            createElement(
                'div2',
                {},
            ),
        );
    }
}
