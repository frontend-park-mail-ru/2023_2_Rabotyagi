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
            }
        });
    }

    clear() {
        this.state.saler.name = '';
        this.state.saler.email = '';
        this.state.saler.image = '';
        this.state.goods = [];
    }
    /**
     * @summary Редьюсер для инициализирования стейта корзины
     * @function
     * @returns None
     */
    init() {
        this.state.saler.name = '';
        this.state.saler.email = '';
        this.state.saler.image = '';
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

    deleteFromCart(orderId) {
        const index = this.state.goods.map(elem => elem.order.id).indexOf(orderId);
        if (index != -1) {
            this.state.goods.splice(index, 1);
        } else {
            console.log('Error when deleting from cart');
        }
    }

    emptyCart() {
        this.state.saler.name = '';
        this.state.saler.email = '';
        this.state.saler.image = '';
        this.state.goods = [];
    }

    getCount() {
        return this.state.goods.length;
    }

    getPrice() {
        let result = 0;
        this.state.goods.forEach((elem) => {
            result += Number(elem.order.product.price);
        });
        return result;
    }
};

Object.assign(Cart.prototype, BaseStore);

export default new Cart();