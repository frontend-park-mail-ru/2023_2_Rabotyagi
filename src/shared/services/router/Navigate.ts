type NavigateCallback = () => void;

export class Navigate {
    callbacks: Array<NavigateCallback> = [];

    constructor() {
        window.addEventListener('popstate', () => {
            this.callbacks.forEach((callback) => {
                callback();
            });
        });
    }

    addCallback(newCallback: NavigateCallback) {
        this.callbacks.push(newCallback);
    }

    removeCallback(oldCallback: NavigateCallback) {
        this.callbacks = this.callbacks.filter(callback => callback !== oldCallback);
    }

    navigateTo(url: string, state: any = {}) {
        history.pushState(state, '', url);
        this.callbacks.forEach((callback) => {
            callback();
        });
    }
}

export default new Navigate();
