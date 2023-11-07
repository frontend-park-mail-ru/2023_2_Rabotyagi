export const BaseStore = {
    addListener(listener) {
        this.listeners.push(listener);
    },

    removeListener(listener) {
        this.listeners = this.listeners.filter((element) => {
            return element !== listener;
        });
    }, 

    emitChange() {
        this.listeners.forEach((listener) => {
            listener();
        });
    }
};