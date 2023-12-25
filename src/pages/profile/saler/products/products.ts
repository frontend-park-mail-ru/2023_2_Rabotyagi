import './products.scss';

import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProfilePage } from '../../profilePage/profilePage';

import { UserApi } from '../../../../shared/api/user';

export class SalerProducts extends Component<never, never> {

    public render() {
        return createComponent(
            ProfilePage,
            {
                title: 'Объявления',
                gridXRepeat: 3,
                cardVariant: 'profile-saler',
                options: [
                    {
                        name: 'Объявления',
                        link: '/saler/products',
                        emptyMessage: 'У данного пользователя пока нет объявлений',
                        apiFunction: UserApi.getProductsOfAnotherSaler,
                        apiParams: history.state.salerId,
                    },
                ],
            },
        );
    }
}
