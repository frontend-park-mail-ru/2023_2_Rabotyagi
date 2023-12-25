import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProfilePage } from '../../profilePage/profilePage';

import { OrderApi } from '../../../../shared/api/order';
import Navigate from '../../../../shared/services/router/Navigate';

export class ProfileOrders extends Component<never, never> {

    render() {
        return createComponent(
            ProfilePage,
            {
               title: 'Заказы',
               options: [
                 {
                     name: 'Покупки',
                     link: '/profile/orders/buy',
                     emptyMessage: 'Вы пока ничего не купили.\nВсе купленные вами товары будут отображаться на этой вкладке',
                     emptyButtonText: 'В корзину',
                     emptyButtonOnclick: () => { Navigate.navigateTo('/cart'); },
                     apiFunction: OrderApi.getBuyed,
                 },
                 {
                     name: 'Продажи',
                     link: '/profile/orders/sell',
                     emptyMessage: 'У вас пока ничего не купили.\nВсе проданные вами товары будут отображаться на этой вкладке',
                     emptyButtonText: 'Разместить объявление',
                     emptyButtonOnclick: () => { Navigate.navigateTo('/product/new'); },
                     apiFunction: OrderApi.getSold,
                 },
               ],
               cardVariant: 'sold',
            },
        );
    }
}
