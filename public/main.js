'use strict'
import {Header, print} from "./components/Header/header.mjs"

const rootElement = document.getElementById('root');
const headerElement = document.createElement('nav');
rootElement.appendChild(headerElement);
// console.log('main')

const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            // render: renderFeed,
        },
        login: {
            href: '/login',
            name: 'Авторизоваться',
            // render: renderLogin,
        },
        signup: {
            href: '/signup',
            name: 'Зарегистрироваться',
            // render: renderSignup,

        },
        profile: {
            href: '/profile',
            name: 'Профиль',
            // render: renderProfile,
        },
        // // Вектор атаки XSS. Работает, если делать рендер через строку. Для ознакомления!
        // danger: {
        //     name: `Опасность <iframe src="https://example.com" onload="alert('Упс, сайт взломали!')"></iframe>`,
        //     href: '/',
        //     render: () => {},
        // }
    }
};

const header = new Header(headerElement, config);
header.render()
