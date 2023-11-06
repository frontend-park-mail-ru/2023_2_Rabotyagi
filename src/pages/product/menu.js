import { stringToElement } from '../../shared/utils/parsing';
import template from './menu.hbs';
import button from '../../components/button/button';

class Menu {
    render(saler) {
        const root = stringToElement(template(saler));

        root.querySelector('#button-ad').replaceWith(button({
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Добавить в корзину'
            },
            style: 'width: 100%;'
        }));

        root.querySelector('#send-message').replaceWith(button({
            variant: 'outline',
            text: {
                class: 'text-regular',
                content: 'Написать продавцу'
            },
            style: 'width: 100%;'
        }));

        return root;
    }
}

export default Menu;