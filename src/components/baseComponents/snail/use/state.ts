import { Component } from '../component';

interface IUseState<StateType> {
    get: () => StateType,
    set: (newState: StateType) => void
}

export function foo<StateType>(this: Component<any, any>, initState: StateType): IUseState<StateType> {
    debugger;
    // if (!this) {
    //     throw new Error('useState must be inside of Component');
    // }
    if (!(this instanceof Component)) {
        throw new Error('useState must be inside of Component');
    }

    const state = initState;

    const getState = () => state;
    const setState = (newState: StateType) => {
        this.setState(newState);
    };

    return {
        get: getState,
        set: setState,
    };
}

export const useState = <StateType>(parent: Component<any,any>, state: StateType) => foo.apply(parent, [state]);
// export const useState = (state: any) => foo.bind();
