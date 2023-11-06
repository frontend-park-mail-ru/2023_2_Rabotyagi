class Dispatcher {
    constructor() {
        this.callbacks = [];
    }

    register(callback) {
        console.log('register', callback);
        this.callbacks.push(callback);
    }

    dispatch(action) {
        console.log('dispatch', action);
        this.callbacks.forEach((callback) => {
            callback(action);
        });
    }
};

export default new Dispatcher();