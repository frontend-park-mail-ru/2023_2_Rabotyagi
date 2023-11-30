import ajax from '../services/ajax';
const { MOCK } = process.env;

interface Resource {
    url: string,
}

export const getResourceUrl = (resource: string | Resource) => {
    if (!resource) {
        return resource;
    }
    if (MOCK === 'false') {
        if (Array.isArray(resource)) {
            return resource.map((res) => {

                res.url = ajax.ADRESS_BACKEND + res.url;

                return res;
            });
        }

        if (typeof resource === 'string'){
            return ajax.ADRESS_BACKEND + resource;
        }

        resource.url = ajax.ADRESS_BACKEND + resource.url;

        return resource;
    }
};
