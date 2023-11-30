import { BaseStore } from './baseStore';
import dispathcer from '../dispatcher/dispatcher';
import { Order } from '../api/order';
import { User } from '../api/user';
import { getResourceUrl } from '../utils/getResource';

class Cart {
    constructor() {

        this.state = {
            goods: [],
            saler: {
                id: 0,
                name: '',
                email: '',
                image: '',
            },
        };

        this.listeners = [];

        dispathcer.register((action) => {
            switch(action.type) {
                case 'ADD_GOOD':
                    this.addInCart(action.payload.order, action.payload.saler);
                    break;
                case 'DELETE_GOOD':
                    this.deleteFromCart(action.payload);
                    break;
                case 'ADD_SALER':
                    this.updateUser(action.payload);
                    break;
                case 'FULL_CART':
                    this.fullCart(action.payload);
                    break;
                case 'UPDATE_COUNT_CART':
                    this.updateOrderCount(action.payload);
                    break;
                case 'BUY_ALL':
                    this.clear();
                    break;
                default:
                    break;
            }
            this.emitChange();
        });
    }

    async getOrders() {
        try {
            const resp = await Order.getCart();
            const body = resp.body;
            if (resp.status != 200) {
                throw body.error;
            }

            if (Array.isArray(body)) {
                this.fullCart([ ...body ]);
                if (body.length !== 0) {
                    const respUser = await User.getProfile(body[ 0 ].saler_id);
                    const bodyUser = respUser.body;
                    if (respUser.status != 200) {
                        throw bodyUser.error;
                    }
                    bodyUser.avatar = getResourceUrl(bodyUser.avatar);
                    this.updateUser(bodyUser);
                }
                this.emitChange();
            }

        } catch(err) {
            // console.log(err);
        }
    }

    emptySaler() {
        this.state.saler.id = 0;
        this.state.saler.name = '';
        this.state.saler.email = '';
        this.state.saler.avatar = '';
    }

    clear() {
        this.emptySaler();
        this.state.goods = [];
    }
    /**
     * @summary Редьюсер для инициализирования стейта корзины
     * @function
     * @returns None
     */
    init() {
        this.emptySaler();
        this.state.goods = [];
        this.getOrders();
    }

    hasUser() {
        return this.state.saler.id !== 0;
    }

    sameUser(userId) {
        return !this.hasUser() || userId === this.state.saler.id;
    }

    updateUser(saler) {
        this.state.saler = {
            ...this.state.saler,
            ...saler,
        };
    }

    hasProduct(productId) {
        const index = this.state.goods?.map(elem => elem.product_id).indexOf(productId);

        return index !== -1;
    }

    fullCart(goods) {
        goods?.forEach(element => {
            if (!this.sameUser(element.saler_id)) {
                return false;
            }
            if (!this.hasUser()) {
                this.updateUser({
                    id: element.saler_id,
                    email: '...',
                    name: '...',
                });
            }
        });
        this.state.goods = [ ...goods ];

        return true;
    }

    addInCart(good, saler) {
        if (this.sameUser(saler.id)) {
            this.state.goods?.push(good);
            if (!this.hasUser()) {
                this.updateUser(saler);
            }

            return true;
        }

        return false;
    }

    updateOrderCount({ orderId, count }) {
        const index = this.state.goods?.map(elem => elem.id).indexOf(orderId);
        if (index != -1) {
            this.state.goods[ index ].count = count;
        }
    }

    deleteFromCart(orderId) {
        const index = this.state.goods?.map(elem => elem.id).indexOf(orderId);
        if (index != -1) {
            this.state.goods.splice(index, 1);
            if (this.getCount() === 0) {
                this.emptySaler();
            }
        } else {
            // console.log('Error when deleting from cart');
        }
    }

    getCount() {
        let result = 0;
        this.state.goods?.forEach((elem) => {
            result += Number(elem.count);
        });

        return result;
    }

    getPrice() {
        let result = 0;
        this.state.goods?.forEach((elem) => {
            result += Number(elem.price) * Number(elem.count);
        });

        return result;
    }
}

Object.assign(Cart.prototype, BaseStore);

export default new Cart();
