
export const store = {
    pages: {
        appendPage: (name, func) => {
            store.pages[name] = func
        },
    },
    activePage: 'main'
}

// function get_value(key) {
//     store[key]
// 
// export const store = () => {
//     state = {}

    
// }