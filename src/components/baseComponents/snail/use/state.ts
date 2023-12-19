import { Component } from '../component';

interface IUseState {
    get: any,
    set: (newState: any) => void
}

export function useState(this: Component<any, any>, initState: any): IUseState {
    debugger;
    // if (!this) {
    //     throw new Error('useState must be inside of Component');
    // }
    if (!(this instanceof Component)) {
        throw new Error('useState must be inside of Component');
    }

    const state = initState;

    const getState = state;
    const setState = (newState: any) => {
        debugger;
        this.setState(newState);
    };

    return {
        get: getState,
        set: setState,
    };
}
