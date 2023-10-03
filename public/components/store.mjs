
export const store = {
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
                store.authored = true
                store.user.email = email
            }
        },
        login: (email) => {
            localStorage.setItem('email', email)
            store.authored = true
            store.user.email = email
        },
        logout: () => {
            store.user.username = null
            store.user.email = null
            store.user.accessToken = null
            store.user.refreshToken = null
            localStorage.removeItem('email')
        },
        username: null,
        email: null,
        accessToken: null,
        refreshToken: null
    },
    activePage: 'main',
    authored: false,
}

// function get_value(key) {
//     store[key]
// 
// export const store = () => {
//     state = {}

    
// }