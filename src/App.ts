import { Component } from './components/baseComponents/snail/component';
import { createElement, createComponent } from './components/baseComponents/snail/vdom/VirtualDOM';
import { TextArea } from './components/baseComponents/TextArea/TextArea';
import CounterStore from './shared/store/counter';
import { Button } from './components/baseComponents/button/Button';
import StoreUser from './shared/store/user';

interface AppState {
    title: string,
    count: number,
}

const initAppState: AppState = {
    title: 'Welcome to the App',
    count: 0,
};

export class App extends Component<{}, AppState> {

    // state = { ...initAppState };

    // функция для демонстрации работы setState
    // incCount() {
    //     this.setState((state) => {
    //         // к сожалению здесь придётся делать подобные проверки
    //         if (!state) {
    //             state = { ...initAppState };
    //         }
    //         state.count = this.state.count + 1;

    //         return state;
    //     });
    // }

    // связка стора и компонента
    public componentDidMount() {
        // CounterStore.addStoreUpdater(() => { this.applyComponentChanges(); });
    }

    render() {
        return createElement(
            'div',
            { id: 'root' },
            createComponent(
                Button,
                {
                    id: 'button',
                    // leftIcon: {
                    //     height: 28,
                    //     width: 28,
                    //     content: cart,
                    // },
                    text: 'Принтануть юзера',
                    onclick: () => StoreUser.getFields(),
                },
            ),
            createComponent(
                TextArea,
                {},
            ),
        );
    }
}
