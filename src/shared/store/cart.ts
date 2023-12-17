import { Store } from '../services/store/Store';

export enum CartStoreAction {
    ADD_GOOD = 'ADD_GOOD',
    DELETE_GOOD = 'DELETE_GOO',
    ADD_SALER = 'ADD_SALER',
    FULL_CART = 'FULL_CART',
    UPDATE_ORDER_COUNT = 'UPDATE_ORDER_COUNT',
    BUY_ALL = 'BUY_ALL',
    CLEAR_CART = 'CLEAR_CART',
}

interface CartStoreState {
    goods: Array<OrderModel>,
    saler: SalerModel,
}

const initState: CartStoreState = {
    goods: [],
    saler: {
        id: 0,
        name: '',
        email: '',
        avatar: '',
    },
};

class CartStore extends Store<CartStoreState> {
    public addActions(): void {
        this.addAction({
            name: CartStoreAction.ADD_GOOD,
            operation: (payload: {good: OrderModel, saler: SalerModel}) => {
                this.addInCart(payload.good, payload.saler);
            },
        });
        this.addAction({
            name: CartStoreAction.DELETE_GOOD,
            operation: (payload: number) => { this.deleteFromCart(payload); },
        });
        this.addAction({
            name: CartStoreAction.ADD_SALER,
            operation: (payload: SalerModel) => { this.updateUser(payload); },
        });
        this.addAction({
            name: CartStoreAction.FULL_CART,
            operation: (payload: { goods: Array<OrderModel>, saler: SalerModel }) => {
                this.fullCart(payload.goods, payload.saler);
            },
        });
        this.addAction({
            name: CartStoreAction.UPDATE_ORDER_COUNT,
            operation: (payload: { orderId: number, count: number }) => {
                this.updateOrderCount(payload.orderId, payload.count);
            },
        });
        this.addAction({
            name: CartStoreAction.BUY_ALL,
            operation: () => { this.clear(); },
        });
        this.addAction({
            name: CartStoreAction.CLEAR_CART,
            operation: () => { this.clear(); },
        });
    }

    public clearSaler() {
        this.state.saler = { ...initState.saler };
    }

    public clear() {
        this.state = { ...initState };
    }

    public init() {
        this.clear();
    }

    public hasUser() {
        return this.state.saler.id !== 0;
    }

    public sameUser(userId: number) {
        return !this.hasUser() || userId === this.state.saler.id;
    }

    public updateUser(saler: SalerModel) {
        this.state.saler = {
            ...this.state.saler,
            ...saler,
        };
    }

    public hasProduct(productId: number) {
        const index = this.state.goods.map(elem => elem.product_id).indexOf(productId);

        return index !== -1;
    }

    private fullCart(goods: Array<OrderModel>, saler: SalerModel) {
        this.state.goods = [ ...goods ];
        this.updateUser(saler);

        return true;
    }

    private addInCart(good: OrderModel, saler: SalerModel) {
        if (this.sameUser(saler.id)) {
            this.state.goods.push(good);
            if (!this.hasUser()) {
                this.updateUser(saler);
            }

            return true;
        }

        return false;
    }

    private updateOrderCount(orderId: number, count: number) {
        const index = this.state.goods.map(elem => elem.id).indexOf(orderId);
        if (index !== -1) {
            this.state.goods[ index ].count = count;
        }
    }

    private deleteFromCart(orderId: number) {
        const index = this.state.goods.map(elem => elem.id).indexOf(orderId);
        if (index !== -1) {
            this.state.goods.splice(index, 1);
            if (this.getCount() === 0) {
                this.clearSaler();
            }
        } else {
            console.log('Error when deleting from cart');
        }
    }

    public getCount() {
        let result = 0;
        this.state.goods.forEach((elem) => {
            result += elem.count;
        });

        return result;
    }

    public getPrice() {
        let result = 0;
        this.state.goods.forEach((elem) => {
            result += elem.price * elem.count;
        });

        return result;
    }

    public getGoods() {
        return [ ...this.state.goods ];
    }

    public getSaler() {
        return { ...this.state.saler };
    }
}

export default new CartStore(initState);
