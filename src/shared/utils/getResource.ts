import ajax from '../services/ajax';
// const { MOCK } = process.env;

type Resource = {
    url: string,
}

function getResourceUrl(resource: Resource): Resource;

function getResourceUrl(resource: string): string;

// function getResourceUrl(resource: Resource) {

// }

function getResourceUrl(resource: string | Resource): Resource | string {
    if (typeof resource === 'string') {
        return ajax.ADRESS_BACKEND + resource;
    }
    resource.url = ajax.ADRESS_BACKEND + resource.url;

    return resource;
}

// function getResourceUrl(resource: string): string {
//     return ajax.ADRESS_BACKEND + resource;
// }

export {
    getResourceUrl,
};
