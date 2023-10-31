const cart = {
    clear: () => {
        cart.state.goods = null;
    },
    /**
     * @summary Редьюсер для инициализирования стейта корзины
     * @function
     * @returns None
     */
    init: () => {
        cart.state.goods = [];
    },
    fullCart: ({ goods }) => {
        cart.state.goods = [...goods];
    },
    addInCart: (good) => {
        cart.state.goods.push(good);
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