import ajax from "../services/ajax";

export const getResourceUrl = (resource) => {
    if (resource) {
        resource = process.env.MOCK === 'true' ?
            resource
            :
            ajax.ADRESS_BACKEND + resource;
        return resource;
    }
    return undefined;
}