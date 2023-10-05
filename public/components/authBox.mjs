import { store } from "./store.mjs"

export class AuthBox {
    constructor(){

    }

    render() {
        const root = document.createElement('div')
        const signinBtn = document.createElement('button')
        const signupBtn = document.createElement('button')

        signinBtn.textContent = 'Войти'
        signupBtn.textContent = 'Зарегистрироваться'

        signinBtn.classList = ['btn-neutral']
        signupBtn.classList = ['btn-neutral']

        signinBtn.addEventListener('click', function(e) {
            e.stopPropagation()
            store.activePage = 'signin'
            store.pages['signin']()
        })

        signupBtn.addEventListener('click', function(e) {
            e.stopPropagation()
            store.activePage = 'signup'
            store.pages['signup']()
        })

        root.appendChild(signinBtn)
        root.appendChild(signupBtn)
        root.classList = ['auth-box']

        return root
    }
}