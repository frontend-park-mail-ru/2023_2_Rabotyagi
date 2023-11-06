import { BaseStore } from "./baseStore";
import dispathcer from "../dispatcher/dispatcher";

class Cart {
    constructor() {
        this.state = {
            goods: [],
            saler: {
                id: 0,
                name: '',
                email: '',
                image: '',
            }
        }

        this.listeners = [];

        dispathcer.register((action) => {
            switch(action.type) {
                case 'ADD_GOOD':
                    console.log('ACTION: ', action.type);
                    this.addInCart(action.payload);
                    this.emitChange();
                    break;
                case 'DELETE_GOOD':
                    console.log('ACTION: ', action.type);
                    this.deleteFromCart(action.payload);
                    this.emitChange();
                    break;
                case 'ADD_SALER':
                    console.log('ACTION: ', action.type);
                    this.updateUser(action.payload);
                    this.emitChange();
                    break;
                case 'FULL_CART':
                    console.log('ACTION: ', action.type);
                    this.fullCart(action.payload);
                    this.emitChange();
                    break;
                case 'UPDATE_COUNT_CART':
                    console.log('ACTION: ', action.type);
                    this.updateOrderCount(action.payload);
                    this.emitChange();
                    break;
                case 'BUY_ALL':
                    console.log('ACTION: ', action.type);
                    this.clear();
                    this.emitChange();
                    break;
            }
        });
    }

    emptySaler() {
        this.state.saler.name = '';
        this.state.saler.email = '';
        this.state.saler.image = '';
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
    }

    hasUser() {
        return this.state.saler.email !== '';
    }

    sameUser(email) {
        return !this.hasUser() || email === this.state.saler.email;
    }

    updateUser(saler) {
        this.state.saler.name = saler.name;
        this.state.saler.email = saler.email;
        this.state.saler.image = saler.image;
    }

    fullCart(goods) {
        goods.forEach(element => {
            if (!this.sameUser(element.order.product.saler.email)) {
                console.log("Error: other user");
                return false;
            }
            if (!this.hasUser()) {
                this.updateUser(element.order.product.saler);
            }
        });
        this.state.goods = [...goods];
        return true;
    }

    addInCart(good) {
        if (this.sameUser(good.order.product.saler.email)) {
            this.state.goods.push(good);
            if (!this.hasUser()) {
                this.updateUser(good.order.product.saler);
            }
            return true;
        }
        console.log("Error: other user");
        return false;
    }

    updateOrderCount({ orderId, count }) {
        const index = this.state.goods.map(elem => elem.order.id).indexOf(orderId);
        if (index != -1) {
            this.state.goods[index].order.count = count;
            console.log(this.state.goods[index]);
        }
    }

    deleteFromCart(orderId) {
        const index = this.state.goods.map(elem => elem.order.id).indexOf(orderId);
        if (index != -1) {
            this.state.goods.splice(index, 1);
            if (this.getCount() === 0) {
                this.emptySaler();
            }
        } else {
            console.log('Error when deleting from cart');
        }
        console.log(this.state);
    }

    getCount() {
        let result = 0;
        this.state.goods.forEach((elem) => {
            result += Number(elem.order.count);
        });
        return result;
    }

    getPrice() {
        let result = 0;
        this.state.goods.forEach((elem) => {
            result += Number(elem.order.product.price) * Number(elem.order.count);
        });
        return result;
    }
};

Object.assign(Cart.prototype, BaseStore);

export default new Cart();