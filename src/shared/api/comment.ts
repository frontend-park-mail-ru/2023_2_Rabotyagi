import { CommentRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class CommentApi {
    static async add(comment: any) {
        return await Ajax.getInstance().post({
            url: CommentRoutes.ADD,
            body: comment,
            credentials: 'include',
        });
    }

    static async getComments() {
        return await Ajax.getInstance().get({
            url: CommentRoutes.GET_LIST,
            credentials: 'include',
        });
    }

    static async deleteComment(commentId: number) {
        return await Ajax.getInstance().delete({
            url: CommentRoutes.DELETE,
            params: {
                id: commentId,
            },
            credentials: 'include',
        });
    }

    static async update(commentId: number, comment: any) {
        return await Ajax.getInstance().patch({
            url: CommentRoutes.UPDATE,
            params: {
                comment_id: commentId,
            },
            body: comment,
            credentials: 'include',
        });
    }
}
