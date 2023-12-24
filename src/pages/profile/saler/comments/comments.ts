import { Component } from "../../../../components/baseComponents/snail/component";
import { createComponent } from "../../../../components/baseComponents/snail/vdom/VirtualDOM";

import { ProfilePage } from "../../profilePage/profilePage";

import { CommentApi } from "../../../../shared/api/comment";

export class SalerComments extends Component<never, never> {

    render() {

        return createComponent(
            ProfilePage,
            {
                title: 'Отзывы',
                grid_x_repeat: 1,
                card_variant: 'comment',
                options: [
                    {
                        name: 'Отзывы',
                        link: '/profile/saler/comments',
                        empty_message: 'Никто пока не оставил вам отзыв.\nВсе оставленные вам отзывы будут отображаться на этой вкладке',
                        api_function: CommentApi.getComments,
                        api_params: history.state.salerId,
                    },
                ],
            }
        );
    }
}