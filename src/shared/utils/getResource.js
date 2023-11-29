import ajax from '../services/ajax';
const { SCHEMA, API_URL, API_PORT, MOCK, NODE_ENV } = process.env;

let ADRESS_BACKEND;

if (NODE_ENV === 'production'){
    ADRESS_BACKEND = SCHEMA + API_URL + '/api/v1';
} else {
    ADRESS_BACKEND = ajax.ADRESS_BACKEND;
}

export const getResourceUrl = (resource) => {
    if (!resource) {
        return resource;
    }
    if (MOCK === 'false') {
        if (Array.isArray(resource)) {
            return resource.map((res) => {

                res.url = ADRESS_BACKEND + res.url;

                return res;
            });
        }

        if (typeof resource === 'string'){
            return ADRESS_BACKEND + resource;
        }

        resource.url = ADRESS_BACKEND + resource.url;

        return resource;
    }
};
