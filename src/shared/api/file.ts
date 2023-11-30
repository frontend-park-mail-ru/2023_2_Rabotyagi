import ajax from '../services/ajax.js';
import { FilesRoutes } from '../constants/api.js';
import { ContentType } from '../constants/contentType.js';

export class Files {
    static async images(files: Array<File>) {
        return await ajax.post({
            url: FilesRoutes.IMAGES,
            body: {
                images: files,
            },
            contentType: ContentType.multipartFormData,
            credentials: 'include',
        });
    }
}
