export const BaseStore = {
    addListener(listener) {
        console.log('add listener', this.listeners);
        this.listeners.push(listener);
    },

    removeListener(listener) {
        console.log('remove listener');
        this.listeners = this.listeners.filter((element) => {
            return element !== listener;
        });
    }, 

    emitChange() {
        console.log('emit change');
        this.listeners.forEach((listener) => {
            listener();
        });
    }
};