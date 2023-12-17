import Dispatcher from './Dispatcher';

export type StoreOperation = (payload: any) => void;
export type StoreListener = () => void;

export interface InnerActionInterface {
    name: string,
    operation: StoreOperation,
}

export interface ActionInterface {
    name: string,
    payload?: any
}

export abstract class Store<StateType> {
    protected initState: StateType;
    protected state: StateType;
    protected listeners: Array<StoreListener> = [];
    protected actions: Array<InnerActionInterface> = [];

    constructor(initState: StateType) {
        this.initState = structuredClone(initState);
        this.state = structuredClone(initState);

        this.addActions();
        Dispatcher.register((action: ActionInterface) => {
            this.actions.find((innerAction) => innerAction.name == action.name)?.operation(action);
            this.emitChange();
        });
    }

    public init() {
        this.state = structuredClone(this.initState);
    }

    public addAction = (action: InnerActionInterface) => {
        this.actions.push(action);
    };

    public addStoreUpdater(listener: StoreListener): void {
        this.listeners.push(listener);
    }

    public removeStoreUpdater(listener: StoreListener): void {
        this.listeners = this.listeners.filter((element) => {
            return element !== listener;
        });
    }

    public emitChange(): void {
        this.listeners.forEach((listener) => {
            listener();
        });
    }

    public abstract addActions(): void;
}
