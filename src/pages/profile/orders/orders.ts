import { Component } from "../../../components/baseComponents/snail/component";
import { createComponent } from "../../../components/baseComponents/snail/vdom/VirtualDOM";

import { ProfilePage } from "../profilePage/profilePage";

import { OrderApi } from "../../../shared/api/order";
import Navigate from "../../../shared/services/router/Navigate";

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
                     empty_message: 'Вы пока ничего не купили.\nВсе купленные вами товары будут отображаться на этой вкладке',
                     empty_button_text: 'В корзину',
                     empty_button_onclick: () => { Navigate.navigateTo('/cart'); },
                     api_function: OrderApi.getBuyed,
                 },
                 {
                     name: 'Продажи',
                     link: '/profile/orders/sell',
                     empty_message: 'У вас пока ничего не купили.\nВсе проданные вами товары будут отображаться на этой вкладке',
                     empty_button_text: 'Разместить объявление',
                     empty_button_onclick: () => { Navigate.navigateTo('/product/new'); },
                     api_function: OrderApi.getSold,
                 }
               ],
               card_variant: 'sold',
            }
        );
    }
}