import { Component } from "../../../components/baseComponents/snail/component";
import { createComponent } from "../../../components/baseComponents/snail/vdom/VirtualDOM";

import { ProfilePage } from "../profilePage/profilePage";

import { CommentApi } from "../../../shared/api/comment";
import UserStore from "../../../shared/store/user";

export class ProfileComments extends Component<never, never> {

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
                        link: '/profile/comments',
                        empty_message: 'Никто пока не оставил вам отзыв.\nВсе оставленные вам отзывы будут отображаться на этой вкладке',
                        api_function: CommentApi.getComments,
                        api_params: UserStore.getFields()?.id,
                    },
                ],
            }
        );
    }
}