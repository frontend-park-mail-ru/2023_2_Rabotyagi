import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProfilePlaceholder } from '../placeholder/placeholder';

import CartStore from '../../../shared/store/cart';

export interface ProfileORdersState {
    goods: Array<OrderModel>,
}

export class ProfileOrders extends Component<never, ProfileORdersState> {

    state = {
        goods: CartStore.getGoods(),
    };

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
