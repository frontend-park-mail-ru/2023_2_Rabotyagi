import { FilesRoutes } from '../constants/api';
import { ContentType } from '../constants/contentType';
import { Ajax } from '../services/ajax';

export class FileApi {
    static async images(files: Array<File> | File) {
        return await Ajax.getInstance().post({
            url: FilesRoutes.IMAGES,
            body: {
                images: files,
            },
            contentType: ContentType.multipartFormData,
            credentials: 'include',
        });
    }
}
