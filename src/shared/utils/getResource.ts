import { Ajax } from '../services/ajax';

export type Resource = {
    url: string,
}

export function getResourceUrl(resource: string | Resource): Resource | string {
    if (typeof resource === 'string') {
        try {
            const adress = new URL(resource);

            return adress.toString();
        }
        catch (err) {
            return Ajax.getInstance().ADRESS_BACKEND + resource;
        }

    }

    try {
        const adress = new URL(resource.url);

        return adress.toString();
    }
    catch (err) {
        resource.url = Ajax.getInstance().ADRESS_BACKEND + resource.url;

        return resource;
    }
}
