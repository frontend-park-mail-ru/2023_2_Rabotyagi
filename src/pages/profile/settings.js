import template from './templates/settings.hbs'
import './styles/settings.scss';
import { stringToElement } from '../../shared/utils/parsing';
import { cookieParser } from '../../shared/utils/cookie';
import button from '../../components/button/button';
import { User } from '../../shared/api/user';
import { ErrorMessageBox } from '../../components/error/errorMessageBox';
import { store } from '../../shared/store/store';


class Settings {
    async patchProfile(data, errorBox) {
        const res = await User.patchProfile(data);
        const body = res.body;

        if (res.status !== 200) {
            errorBox.replaceWith(ErrorMessageBox(body.message, 'errorBox'));
            return;
        }

        store.user.login(
            cookieParser(document.cookie).access_token
        );
    }

    render() {
        
        const root = stringToElement(template(store.user.state.fields));

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

            body.id = store.user.state.fields.userID;

            const res = await User.patchProfile(body);
            body = res.body;

            const errorBox = root.querySelector('#errorBox');

            if (res.status !== 200) {
                errorBox.replaceWith(ErrorMessageBox(body.error, 'errorBox'));
                return;
            }

            store.user.login(
                cookieParser(document.cookie)
            );
            window.Router.navigateTo('/profile/settings');
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

        root.querySelector('#btn-cancel').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            inputs?.forEach((elem) => {
                elem.value = '';
            });
        });
        
        return [ root ];
    }
}

export default Settings;