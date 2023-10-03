export class AuthBox {
    constructor(){

    }

    render() {
        const root = document.createElement('div')
        const signinBtn = document.createElement('a')
        const signupBtn = document.createElement('a')

        signinBtn.textContent = 'Войти'
        signinBtn.href = '/signin'
        signupBtn.textContent = 'Зарегистрироваться'
        signupBtn.href = '/signup'

        signinBtn.addEventListener('click', (e) => {
            e.stopPropagation()

        })

        signupBtn.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        root.appendChild(signinBtn)
        root.appendChild(signupBtn)
        root.classList = ['auth-box']

        return root
    }
}