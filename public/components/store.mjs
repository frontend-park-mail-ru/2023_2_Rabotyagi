const ADRESS_BACKEND = 'http://localhost:8080'


const store = {
    pages: {
        appendPage: (name, func) => {
            store.pages[name] = func
        },
        redirect: (name) => {
            store.pages[name]()
        }
    },
    user: {
        setName: (name) => {
            store.user.username = name
        },
        init: () => {
            let email = localStorage.getItem('email')
            if (email != null) {
                store.authorized = true
                store.user.email = email
            }
        },
        login: (email) => {
            localStorage.setItem('email', email)
            store.authorized = true
            store.user.email = email
        },
        logout: () => {
            store.user.username = null
            store.user.email = null
            store.user.accessToken = null
            store.user.refreshToken = null
            localStorage.removeItem('email')
            store.authorized = false
        },
        username: null,
        email: null,
        accessToken: null,
        refreshToken: null
    },
    activePage: 'main',
    authorized: false,
}

export {ADRESS_BACKEND, store}