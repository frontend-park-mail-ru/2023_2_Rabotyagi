import { store } from "./store.mjs"

export class SignupPage {
    constructor() {

    }

    checkPass(pass, repeatPass) {
        if (pass != repeatPass){
            alert('Пароли не совпадают')
            return false
        }
        return true
    }

    render(){
        console.log('signin Page render start')
        const root = document.createElement('div')
        const content = document.createElement('div')
        const info = document.createElement('div')

        root.classList = ['signinPage']
        content.classList = ['signinPage-content']
        info.classList = ['signinPage-info']

        const logoBtn = document.createElement('button')
        const emailInput = document.createElement('input')
        const passInput = document.createElement('input')
        const repeatPassInput = document.createElement('input')
        const submitBtn = document.createElement('button')
        const toRegBtn = document.createElement('button')

        logoBtn.textContent = '(Главная) Тут должно быть лого, но пока его нет((('
        emailInput.placeholder = 'Электронная почта'
        passInput.placeholder = 'Пароль'
        repeatPassInput.placeholder = 'Повтор пароля'
        submitBtn.textContent = 'Подтвердить'

        logoBtn.classList = ['btn-neutral']
        submitBtn.classList = ['btn-neutral']
        toRegBtn.classList = ['btn-neutral']
        emailInput.classList = ['inputField']
        passInput.classList = ['inputField']
        repeatPassInput.classList = ['inputField']

        logoBtn.addEventListener('click', (e) => {
            store.pages['main']()
        })

        submitBtn.addEventListener('click', (e) => {
            const check = this.checkPass(passInput.value, repeatPassInput.value)

            if (check) {
                console.log('пароли совпадают')
            } else {
                
            }
        })

        content.appendChild(logoBtn)
        content.appendChild(emailInput)
        content.appendChild(passInput)
        content.appendChild(repeatPassInput)
        content.appendChild(submitBtn)

        root.appendChild(content)
        root.appendChild(info)

        return root
    }
}