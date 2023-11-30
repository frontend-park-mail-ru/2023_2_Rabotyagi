import { Component } from './components/baseComponents/snail/component';
import { createElement, createComponent, createText } from './components/baseComponents/snail/vdom/VirtualDOM';
import { TextArea } from './components/baseComponents/TextArea/TextArea';
// import CounterStore from './shared/store/counter';
import { Button } from './components/baseComponents/button/Button';
import StoreUser from './shared/store/user';
import { Dropdown } from './components/baseComponents/dropdown/dropdown';

import { Signin } from './pages/signin/Signin';

interface AppState {
    title: string,
    count: number,
}

// const initAppState: AppState = {
//     title: 'Welcome to the App',
//     count: 0,
// };

const dropdown = createComponent(
    Dropdown,
    {
        search: false,
    },
    createComponent(
        Button,
        {
            text: 'first',
        },
    ),
    createComponent(
        Button,
        {
            text: 'second',
        },
    ),
    createComponent(
        Button,
        {
            text: 'third',
        },
    ),
);

export class App extends Component<never, AppState> {

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
            /*createComponent(
                Button,
                {
                    variant: 'neutral',
                    text: 'Показать списочек',
                    onclick: () => dropdown.instance?.setState(() => {return {hidden: false};}),
                },
            ),
            dropdown,*/
            createComponent(
                Signin,
                {}
            )
        );
    }
}
