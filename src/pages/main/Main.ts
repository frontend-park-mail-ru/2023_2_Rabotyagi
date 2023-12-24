import { Component } from '../../components/baseComponents/snail/component';
import { VDomComponent, VDomNode, createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Feed } from '../../components/feed/feed';
import { Header } from '../../components/header/header';

export class MainPage extends Component<never, never> {
    constructor(){
        super();

        document.title = 'GoodsGalaxy | Главная';
    }

    feedComp: VDomComponent | undefined;

    public componentWillUnmount(): void {
        (this.feedComp?.instance as Feed).unmount();
    }

    public render(): VDomNode {
        this.feedComp = createComponent(
            Feed,
            {},
        );

        return createElement(
            'mainpage',
            {},
            createComponent(
                Header,
                {},
            ),
            this.feedComp,
        );
    }
}
