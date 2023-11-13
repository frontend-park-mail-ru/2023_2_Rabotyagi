import { API } from '../constants/api.js';
import { multipartFormData } from '../constants/contentType.js';
import ajax from '../services/ajax.js';

export const Files = {
    images: async (files) => {
        return await ajax.post({
            url: API.FILES.IMAGES,
            body: {
                images: files
            },
            contentType: multipartFormData,
            credentials: 'include',
        })
    }
}