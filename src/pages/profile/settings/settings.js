import template from './settings.hbs'
import './settings.scss';
import { stringToElement } from '../../../shared/utils/parsing';
import { cookieParser } from '../../../shared/utils/cookie';
import jwtDecode from '../../../shared/utils/jwt-decode';
import button from '../../../components/button/button';
import { UserApi } from '../../../shared/api/user';
import { ErrorMessageBox } from '../../../components/error/errorMessageBox';
import { store } from '../../../shared/store/store';


class Settings {
    async patchProfile(data, errorBox) {
        const res = await UserApi.patchProfile(data);
        const body = await res.json();

        if (res.status !== 200) {
            errorBox.replaceWith(ErrorMessageBox(body.message, 'errorBox'));
            return;
        }

        store.user.login(
            cookieParser(document.cookie).access_token
        );
    }

    render() {
        
        const root = stringToElement(template(
            jwtDecode(
                cookieParser(document.cookie).access_token
            )
        ));

        const inputs = root.querySelectorAll('.content input');

        root.querySelector('.content').addEventListener('submit', async function(e) {
            e.preventDefault();
            const { elements } = this;
            const data = Array.from(elements)
            .filter((item) => !!item.name && !!item.value)
            .map((element) => {
                const { name, value } = element
                return { [ name ]: value }
            })

            let body = {};
            data.forEach((elem) => body = { ...body, ...elem });

            const res = await UserApi.patchProfile(body);
            body = await res.json();

            // console.log(res);
            const errorBox = root.querySelector('#errorBox');

            if (res.status !== 200) {
                errorBox.replaceWith(ErrorMessageBox(body.message, 'errorBox'));
                return;
            }

            store.user.login(
                cookieParser(document.cookie)
            );

            console.log(body)
        });

        root.querySelector('#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Сохранить'
            },
            type: 'submit',
            // style: 'width: 100%;'
        }));

        root.querySelector('#btn-cancel').replaceWith(button({
            id: 'btn-cancel',
            variant: 'outlined',
            text: {
                class: 'text-regular',
                content: 'Отменить'
            },
            // style: 'width: 100%;'
        }));

        root.querySelector('#btn-cancel').addEventListener('click', () => {
            inputs?.forEach((elem) => {
                elem.value = '';
            });
        });
        
        return [ root ];
    }
}

export default Settings;