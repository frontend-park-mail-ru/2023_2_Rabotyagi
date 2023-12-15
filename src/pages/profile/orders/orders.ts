import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { ProfilePlaceholder } from '../placeholder';

export class ProfileOrders extends Component<never, never> {

    public render() {

        return createElement(
            'orders',
            {},
            createComponent(
                ProfilePlaceholder,
                {
                    text: 'Все созданные вами заказы будут на этой вкладке',
                },
            ),
        );
    }
}
