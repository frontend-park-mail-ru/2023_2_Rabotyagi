import template from './settings.hbs'
import './settings.scss';
import { stringToElement } from '../../../shared/utils/parsing';
import { cookieParser } from '../../../shared/utils/cookie';
import jwtDecode from '../../../shared/utils/jwt-decode';
import button from '../../../components/button/button';


class Settings {


    render() {
        
        const root = stringToElement(template(
            jwtDecode(
                cookieParser(document.cookie).access_token
            )
        ));

        root.querySelector('#btn-submit').replaceWith(button({
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Сохранить'
            },
            // style: 'width: 100%;'
        }));

        root.querySelector('#btn-cancel').replaceWith(button({
            variant: 'outlined',
            text: {
                class: 'text-regular',
                content: 'Отменить'
            },
            // style: 'width: 100%;'
        }));
        
        return [ root ];
    }
}

export default Settings;