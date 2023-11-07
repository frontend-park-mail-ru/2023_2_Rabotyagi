import template from './settings.hbs'
import './settings.scss';
import { stringToElement } from '../../../shared/utils/parsing';
import { cookieParser } from '../../../shared/utils/cookie';
import jwtDecode from '../../../shared/utils/jwt-decode';
import button from '../../../components/button/button';
import { UserApi } from '../../../shared/api/user';


class Settings {
    render() {
        
        const root = stringToElement(template(
            jwtDecode(
                cookieParser(document.cookie).access_token
            )
        ));

        const inputs = root.querySelectorAll('.content input');

        root.querySelector('.content').addEventListener('submit', function(e) {
            e.preventDefault();
            const { elements } = this;
            const data = Array.from(elements)
            .filter((item) => !!item.name)
            .map((element) => {
                const { name, value } = element

                return { [ name ]: value }
            })

            let body = {};
            data.forEach((elem) => body = { ...body, elem });

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

        // root.querySelector('#btn-submit').addEventListener('click', (e) => {
        //     e.preventDefault();
        //     const { elements } = this;
        //     console.log(elements);
        //     const data = Array.from(elements)
        //         .filter((item) => !!item.name)
        //         .map((element) => {
        //             const { name, value } = element

        //             return { name, value }
        //         })

        //     console.log(data)
        // });

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