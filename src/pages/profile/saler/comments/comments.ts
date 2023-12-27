import { Component } from '../../../../components/baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../../components/loader/Loader';
import { Text } from '../../../../components/baseComponents';
import { ProfilePlaceholder } from '../../placeholder/placeholder';
import { ProfilePage } from '../../profilePage/profilePage';

import { CommentApi } from '../../../../shared/api/comment';
import { ResponseMessage, ResponseStatusChecker } from '../../../../shared/constants/response';
import { CommentCard, CommentCardProps } from '../../../../components/commentCard/commentCard';

export interface SalerCommentsState {
    loading: boolean,
    error: string,
    contentBlocks: Array<any>,
    selectedPage: number,
}

export class SalerComments extends Component<never, SalerCommentsState> {

    state = {
        loading: true,
        error: '',
        contentBlocks: [],
        selectedPage: 0,
    };

    public componentDidMount() {
        this.getBlocks(0);
    }

    getSelectedIndex() {
        return 0;
    }

    async getBlocks(selectedIndex: number) {
        let resp;
        try {
            resp = await CommentApi.getComments(history.state.salerId);
        } catch (err: any) {
            this.setState({
                ...this.state,
                loading: false,
                error: err.toString(),
                selectedPage: selectedIndex,
            });
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: ResponseMessage.USER_MESSAGE,
                    selectedPage: selectedIndex,
                });

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: ResponseMessage.SERVER_MESSAGE,
                    selectedPage: selectedIndex,
                });

                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: resp.body.error,
                    selectedPage: selectedIndex,
                });

                return;
            }
        }

        this.setState({
            ...this.state,
            loading: false,
            error: '',
            contentBlocks: resp.body ? [...resp.body] : [],
            selectedPage: selectedIndex,
        });
    }

    createContainer() {
        const result: Array<VDomNode> = [];

        this.state.contentBlocks.forEach((block) => {
            result.push(createComponent(
                CommentCard,
                {
                    ...block as CommentCardProps,
                },
            ));
        });

        return result;
    }

    render() {
        return createComponent(
            ProfilePage,
            {
                title: 'Отзывы',
                cardVariant: 'comment',
                gridXRepeat: 1,
                options: [
                    {
                        name: 'Отзывы',
                        link: 'comments',
                        emptyMessage: 'У данного продавца пока нет отзывов',
                        apiFunction: CommentApi.getComments,
                        apiParams: history.state.salerId,    
                    },
                ],
            },
        );
    }
}
