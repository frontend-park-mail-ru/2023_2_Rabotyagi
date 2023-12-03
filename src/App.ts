import { Component } from './components/baseComponents/snail/component';
import { createElement, createComponent } from './components/baseComponents/snail/vdom/VirtualDOM';
// import CounterStore from './shared/store/counter';
// import { Card } from './components/card/Card';
import { Header } from './components/header/header';

// компонент App является родитлеьским для dropdown, а значит он определяет его поведение
// поэтому hidden должен находиться в state у App, а не у Dropdown
// соответсвенно в App есть функция changeHidden, которая меняет этот параметр
// для Dropdown hidden - это свойство, которое передаётся в пропсах

// можно для наглядности в будущем называть состояние внутри App как drodownHidden или наподобии

// НЕ НАДО выносить компоненты в константы. Или хотя бы делать это только внутри функции render!
// НЕ НАДО вызывать setState у детей, это их внутренняя функция, она меняет внутренний state!
// и instance тоже не надо трогать, он архитектурно обрабатывается только виртуальным DOM-ом!

// ещё комментарии есть в Dropdown компоненте

interface AppState {
    title: string,
    count: number,
    hidden: boolean
}

export class App extends Component<never, AppState> {

    state = {
        title: 'Welcome to the App',
        count: 0,
        hidden: true,
    };

    changeHidden() {
        this.setState((state) => {
            state = { ...this.state };
            state.hidden = !this.state.hidden;

            return state;
        });
    }

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
                    onclick: () => { this.changeHidden() },
                },
            ),
            createComponent(
                Dropdown,
                {
                    search: false,
                    hidden: this.state.hidden
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
            ),*/
            // createComponent(
            //     Card,
            //     {
            //         id: 1,
            //         variant: 'favourite',
            //         price: 1000,
            //         title: 'Cat',
            //         delivery: true,
            //         safeDeal: true,
            //         city: 'Moscow',
            //         isActive: true,
            //     },
            // ),

            createComponent(
                Header,
                {},
            ),
        );
    }
}
