import { Store } from '../services/store/Store';
import { getOrders } from './commonActions/getOrders';

export enum CartStoreAction {
    ADD_GOOD = 'ADD_GOOD',
    DELETE_GOOD = 'DELETE_GOO',
    ADD_SALER = 'ADD_SALER',
    FULL_CART = 'FULL_CART',
    UPDATE_ORDER_COUNT = 'UPDATE_ORDER_COUNT',
    BUY_ALL = 'BUY_ALL',
    CLEAR_CART = 'CLEAR_CART',
    REFRESH = 'CART_STORE_REFRESH'
}

interface CartStoreState {
    goods: Array<OrderModel>,
    saler: SalerModel,
    loading: boolean,
}

const initState: CartStoreState = {
    goods: [],
    saler: {
        id: 0,
        name: '',
        email: '',
        avatar: '',
    },
    loading: false,
};

class CartStore extends Store<CartStoreState> {
    public addActions(): void {
        this.addAction({
            name: CartStoreAction.ADD_GOOD,
            operation: ({payload}: {payload: {good: OrderModel, saler: SalerModel}}) => this.addInCart(payload.good, payload.saler),
        });
        this.addAction({
            name: CartStoreAction.DELETE_GOOD,
            operation: ({payload}: {payload: number}) => this.deleteFromCart(payload),
        });
        this.addAction({
            name: CartStoreAction.ADD_SALER,
            operation: ({payload}: {payload: SalerModel}) => this.updateUser(payload),
        });
        this.addAction({
            name: CartStoreAction.FULL_CART,
            operation: ({payload}: {payload: { goods: Array<OrderModel>, saler: SalerModel }}) => this.fullCart(payload.goods, payload.saler),
        });
        this.addAction({
            name: CartStoreAction.UPDATE_ORDER_COUNT,
            operation: ({payload}: {payload: { orderId: number, count: number }}) => this.updateOrderCount(payload.orderId, payload.count),
        });
        this.addAction({
            name: CartStoreAction.BUY_ALL,
            operation: () => this.clear(),
        });
        this.addAction({
            name: CartStoreAction.CLEAR_CART,
            operation: () => this.clear(),
        });
        this.addAction({
            name: CartStoreAction.REFRESH,
            operation: async() => await this.refresh(),
        });
    }

    public clearSaler() {
        this.state.saler = { ...initState.saler };
    }

    public clear() {
        this.state = structuredClone(initState);
        this.state.goods = [];
        this.state.loading = false;
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
        this.state.loading = false;
    }

    public hasProduct(productId: number) {
        const index = this.state.goods.map(elem => elem.product_id).indexOf(productId);

        return index !== -1;
    }

    private fullCart(goods: Array<OrderModel>, saler: SalerModel) {
        this.state.goods = [ ...goods ];
        this.updateUser(saler);
        this.state.loading = false;
        return true;
    }

    private addInCart(good: OrderModel, saler: SalerModel) {
        if (this.sameUser(saler.id)) {
            this.state.goods.push(good);
            if (!this.hasUser()) {
                this.updateUser(saler);
            }
            this.state.loading = false;
            return true;
        }
        this.state.loading = false;
        return false;
    }

    private updateOrderCount(orderId: number, count: number) {
        const index = this.state.goods.map(elem => elem.id).indexOf(orderId);
        if (index !== -1) {
            this.state.goods[ index ].count = count;
        }
        this.state.loading = false;
    }

    private deleteFromCart(orderId: number) {
        const index = this.state.goods.map(elem => elem.id).indexOf(orderId);
        if (index !== -1) {
            this.state.goods.splice(index, 1);
            if (this.getCount() === 0) {
                this.clearSaler();
            }
        } else {
            console.error(new Error('Error when deleting from cart'));
        }
        this.state.loading = false;
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

    public async refresh() {
        await getOrders();
        this.state.loading = false;
    }

    public getGoods() {
        return [ ...this.state.goods ];
    }

    public getGood(orderId: number) {
        const index = this.state.goods.map((element) => element.id).indexOf(orderId);

        if (index !== -1) {
            return this.state.goods[index];
        }
        return this.state.goods[0];
    }

    public getSaler() {
        return { ...this.state.saler };
    }
}

export default new CartStore(initState);
