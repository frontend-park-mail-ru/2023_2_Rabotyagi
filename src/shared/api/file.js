import { multipartFormData } from '../constants/contentType.js';
import ajax from '../services/ajax.js';
import { FILES_API } from '../constants/file_api.js';

export const Files = {
    images: async (files) => {
        return await ajax.post({
            url: FILES_API.IMAGES,
            body: {
                images: files
            },
            contentType: multipartFormData,
            credentials: 'include',
        })
    }
}