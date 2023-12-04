import { Component } from '../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Feed } from '../../components/feed/feed';
import { Header } from '../../components/header/header';

export class MainPage extends Component<never, never> {
    constructor(){
        super();

        document.title = 'GoodsGalaxy | Главная';
    }

    public render(): VDomNode {
        return createElement(
            'div',
            {},
            createComponent(
                Header,
                {},
            ),
            createComponent(
                Feed,
                {},
            ),
        );
    }
}
