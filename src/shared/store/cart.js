const cart = {
    clear: () => {
        cart.state.goods = null;
        cart.state.saler = null;
    },
    /**
     * @summary Редьюсер для инициализирования стейта корзины
     * @function
     * @returns None
     */
    init: () => {
        cart.state.goods = [];
        cart.state.saler = {
            name: '',
            email: ''
        };
    },
    hasUser: () => {
        return cart.state.saler.email !== '';
    },
    sameUser: (email) => {
        return !cart.hasUser() || email === cart.state.saler.email;
    },
    updateUser: (saler) => {
        cart.state.saler.name = saler.name;
        cart.state.saler.email = saler.email;
    },
    fullCart: (goods) => {
        goods.forEach(element => {
            if (!cart.sameUser(element.order.product.saler.email)) {
                console.log("Error: other user");
                return false;
            }
            if (!cart.hasUser()) {
                cart.updateUser(element.order.product.saler);
            }
        });
        cart.state.goods = [...goods];
        return true;
    },
    addInCart: (good) => {
        if (cart.sameUser(good.order.product.saler.email)) {
            cart.state.goods.push(good);
            if (!cart.hasUser()) {
                cart.updateUser(good.order.product.saler);
            }
            return true;
        }
        console.log("Error: other user");
        return false;
    },
    deleteFromCart: ({ index }) => {
        if (index >= 0 && index < cart.state.goods.length) {
            cart.state.goods.splice(index, 1);
        }
    },
    emptyCart: () => {
        cart.state.goods = [];
    },
    getCount: () => {
        return cart.state.goods.length;
    },
    state: {
        goods: null,
    },
};

export default cart;