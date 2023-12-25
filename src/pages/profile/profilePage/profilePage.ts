import './profilePage.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent, VDomNode, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Menu } from '../menu/menu';
import { ProfilePlaceholder } from '../placeholder/placeholder';
import { Text, Button, TextLinkProps } from '../../../components/baseComponents';

import { ResponseMessage, ResponseStatusChecker } from '../../../shared/constants/response';
import { OrderCard, OrderCardProps, OrderCardType } from '../../../components/orderCard/orderCard';
import { CommentCard, CommentCardProps } from '../../../components/commentCard/commentCard';
import { Card, CardProps, CardVariants } from '../../../components/card/Card';
import { Loader } from '../../../components/loader/Loader';

export type ProfileCardType = 'profile' | 'profile-saler' | 'favourite' | 'sold' | 'comment';

export type ProfileMenuUnit = {
    name: string,
    link: string,
    emptyMessage: string,
    emptyButtonText?: string,
    emptyButtonOnclick?: (e?: any) => void,
    apiFunction: (...e: any) => Promise<any>,
    apiParams?: any,
}

export interface ProfilePageProps {
    title: string,
    options: Array<ProfileMenuUnit>,
    cardVariant?: ProfileCardType,
    gridXRepeat?: 1 | 2 | 3,
}

export interface ProfilePageState {
    loading: boolean,
    error: string,
    contentBlocks: Array<any>,
    selectedPage: number,
}

export class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {

    state = {
        loading: true,
        error: '',
        contentBlocks: [],
        selectedPage: 0,
    };

    getSelectedIndex() {
        const currentLocation = location.pathname;
        const optionIndex = this.props.options.findIndex((option) => option.link == currentLocation);
        if (optionIndex !== -1) {
            return optionIndex;
        }

        return 0;
    }

    public componentDidMount() {
        const optionIndex = this.getSelectedIndex();
        history.pushState({}, '', this.props.options[optionIndex].link);
        this.getBlocks(optionIndex);
    }

    profileNavigate(url: string, index: number) {
        history.pushState({}, '', url);
        this.getBlocks(index);
    }

    getMenuOptions() {
        const result: Array<TextLinkProps> = [];
        this.props.options.forEach((option, index) => {
            result.push({
                text: option.name,
                onclick: () => {
                    this.profileNavigate(option.link, index);
                },
            });
        });

        return result;
    }

    async getBlocks(selectedIndex: number) {
        let resp;
        const option = this.props.options[selectedIndex];
        try {
            resp = await option.apiFunction(option.apiParams);
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

        let variant = this.props.cardVariant;
        if (!variant) {
            variant = 'profile';
        }

        if (variant !== 'sold' && variant !== 'comment') {
            this.state.contentBlocks.forEach((block) => {
                result.push(createComponent(
                    Card,
                    {
                        variant: variant as CardVariants,
                        ...block as CardProps,
                        ...block as CardProps,
                    },
                ));
            });
        } else if (variant == 'sold') {
            this.state.contentBlocks.forEach((block) => {
                result.push(createComponent(
                    OrderCard,
                    {
                        variant: variant as OrderCardType,
                        ...block as OrderCardProps,
                        ...block as OrderCardProps,
                    },
                ));
            });
        } else if (variant == 'comment') {
            this.state.contentBlocks.forEach((block) => {
                result.push(createComponent(
                    CommentCard,
                    { ...block as CommentCardProps },
                ));
            });
        }

        return result;
    }

    render() {
        const option = this.props.options[this.state.selectedPage];

        return createElement(
            'div',
            { class: 'profile-page' },
            createComponent(
                Text,
                {
                    variant: 'subheader',
                    text: this.props.title,
                    className: 'profile-page-title',
                },
            ),
            (this.props.options.length > 1) ?
                createComponent(
                    Menu,
                    {
                        variant: 'page',
                        selectedIndex: this.getSelectedIndex(),
                        options: this.getMenuOptions(),
                    },
                ) : createText(''),
            createElement(
                'div',
                { class: 'profile-content-block' },
                (this.state.loading) ?
                    createComponent(
                        Loader, { },
                    ) :
                (this.state.contentBlocks && this.state.contentBlocks.length > 0) ?
                    createElement(
                        'div',
                        { class: 'profile-content-block-full' + (this.props.gridXRepeat || 3).toString() },
                        ...this.createContainer(),
                    ) :
                    createElement(
                        'div',
                        { class: 'profile-content-block-empty' },
                        createComponent(
                            ProfilePlaceholder,
                            {
                                text: option.emptyMessage ? option.emptyMessage : '',
                            },
                        ),
                        (option.emptyButtonText) ?
                            createComponent(
                                Button,
                                {
                                    text: option.emptyButtonText,
                                    variant: 'primary',
                                    onclick: () => {
                                        if (option.emptyButtonOnclick) {
                                            option.emptyButtonOnclick();
                                        }
                                    },
                                },
                            ) : createText(''),
                    ),
            ),
        );
    }
}

