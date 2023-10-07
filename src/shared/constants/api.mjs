const port = '8080';
const ADRESS_BACKEND = 'http://localhost' + ':' + port + '/api/v1/';
export const API = {
    ADRESS_BACKEND: ADRESS_BACKEND,
    SIGNUP: ADRESS_BACKEND + 'signup',
    SIGNIN: ADRESS_BACKEND + 'signin',
    POST_LIST: ADRESS_BACKEND + 'post/get_list'
};
