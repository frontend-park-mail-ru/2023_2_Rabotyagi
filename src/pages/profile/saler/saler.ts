import { Component } from '../../../components/baseComponents/snail/component';
import { createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

export class ProfileSaler extends Component<never, never> {

    public render() {

        return createElement(
            'saler',
            {},
        );
    }
}
