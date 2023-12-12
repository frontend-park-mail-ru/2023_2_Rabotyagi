import { Store } from '../services/store/Store';

export interface CounterStoreInterface {
    count: number
}

const initCounterState: CounterStoreInterface = {
    count: 0,
};

export class CounterStore extends Store<CounterStoreInterface> {
    incCount(): void {
        this.state.count++;
    }

    getCount(): number {
        return this.state.count;
    }

    public addActions() {
        this.addAction({
            name: 'INC_COUNT',
            operation: () => {
                this.incCount();
            },
        });
    }
}

export default new CounterStore(initCounterState);
