import { Dropdown } from "./dropdown.mjs";
import { store } from "./store.mjs";

function signoutBtnClick(e) {
    e.stopPropagation();
    store.user.logout()
    store.pages.redirect('signin')
}

const config = {
    elem1: {
        type: 'button',
        inner: 'Главная',
        style: null,
        events: {
            click: null,
        },
    },
    elem2: {
        type: 'button',
        inner: 'Профиль',
        style: null,
        events: {
            click: null,
        },
    },
    elem3: {
        type: 'button',
        inner: 'Выйти',
        style: null,
        events: {
            click: signoutBtnClick,
        },
    },
}

export class Profile {
    render() {
        const root = document.createElement('button')
        const dropdown = new Dropdown(config).render()
        const img = document.createElement('img')
        const userEmail = document.createElement('span')

        img.src = 'https://shapka-youtube.ru/wp-content/uploads/2020/12/man-ava1.jpg'
        img.classList = ['profile-img']
        userEmail.textContent = store.user.email

        root.appendChild(img)
        root.appendChild(userEmail)
        root.appendChild(dropdown)
        root.classList = ['profile-root']
        dropdown.classList.toggle('hidden')

        root.addEventListener('click', (e) => {
            dropdown.classList.toggle('hidden')
            
            console.log('click');
        })
        return root
    }
}
