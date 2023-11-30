import { ActionInterface } from './Store';
import { StoreOperation } from './Store';

class Dispatcher {
    callbacks: Array<StoreOperation>;

    constructor() {
        this.callbacks = [];
    }

    register(callback: StoreOperation) {
        this.callbacks.push(callback);
    }

    dispatch(action: ActionInterface) {
        this.callbacks.forEach((callback) => {
            callback(action);
        });
    }
}

export default new Dispatcher();
