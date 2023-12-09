import ajax from '../services/ajax';
import { FilesRoutes } from '../constants/api';
import { ContentType } from '../constants/contentType';

export class Files {
    static async images(files: Array<File> | File) {
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
