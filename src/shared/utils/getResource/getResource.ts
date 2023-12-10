import ajax from '../../services/ajax';

export type Resource = {
    url: string,
}

export function getResourceUrl(resource: string | Resource): Resource | string {
    if (typeof resource === 'string') {
        return ajax.ADRESS_BACKEND + resource;
    }
    resource.url = ajax.ADRESS_BACKEND + resource.url;

    return resource;
}

// export {
//     Resource,
//     getResourceUrl,
// };
