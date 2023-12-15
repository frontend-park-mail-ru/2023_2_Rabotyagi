import { Ajax } from '../../../services/ajax';

export type Resource = {
    url: string,
}

export function getResourceUrl(resource: string | Resource): Resource | string {
    if (typeof resource === 'string') {
        return Ajax.getInstance().ADRESS_BACKEND + resource;
    }
    resource.url = Ajax.getInstance().ADRESS_BACKEND + resource.url;

    return resource;
}
