import { Component } from '../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import { Header } from '../../components/header/Header';

export class MainPage extends Component<never, never> {

    public render(): VDomNode {
        return createElement(
            'div',
            {},
            createComponent(
                Header,
                {},
            ),
        );
    }
}
