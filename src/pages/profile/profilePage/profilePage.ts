import './profilePage.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createComponent, VDomNode, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Menu } from '../menu/menu';
import { Loader } from '../../../components/loader/Loader';
import { ProfilePlaceholder } from '../placeholder/placeholder';
import { Text, Button, TextLinkProps } from '../../../components/baseComponents';

import { ResponseMessage, ResponseStatusChecker } from '../../../shared/constants/response';
import { OrderCard, OrderCardProps, OrderCardType } from '../../../components/orderCard/orderCard';
import { Card, CardProps, CardVariants } from '../../../components/card/Card';

export type ProfileCardType = 'profile' | 'profile-saler' | 'favourite' | 'sold';

export type ProfileMenuUnit = {
    name: string,
    link: string,
    empty_message: string,
    empty_button_text?: string,
    empty_button_onclick?: (e?: any) => void,
    api_function: () => Promise<any>, 
}

export interface ProfilePageProps {
    title: string,
    options: Array<ProfileMenuUnit>,
    card_variant?: ProfileCardType,
}

export interface ProfilePageState {
    loading: boolean,
    error: string,
    contentBlocks: Array<any>,
    selected_page: number,
}

export class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {

    state = {
        loading: true,
        error: '',
        contentBlocks: [],
        selected_page: 0,
    }

    getSelectedIndex() {
        let current_location = location.pathname;
        let option_index = this.props.options.findIndex((option) => option.link == current_location);
        if (option_index !== -1) {
            return option_index;
        }

        return 0;
    }

    public componentDidMount() {
        let option_index = this.getSelectedIndex();
        history.pushState({}, '', this.props.options[option_index].link);
        this.getBlocks(option_index);
    }

    profileNavigate(url: string, index: number) {
        history.pushState({}, '', url);
        this.getBlocks(index);
    }

    getMenuOptions() {
        let result: Array<TextLinkProps> = [];
        this.props.options.forEach((option, index) => {
            result.push({
                text: option.name,
                onclick: () => {
                    this.profileNavigate(option.link, index);
                },
            })
        });

        return result;
    }

    async getBlocks(selected_index: number) {
        let resp;
        let option = this.props.options[selected_index];
        try {
            resp = await option.api_function();
        } catch (err: any) {
            console.log(err);
            this.setState({
                ...this.state,
                loading: false,
                error: err.toString(),
                selected_page: selected_index,
            });
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: ResponseMessage.USER_MESSAGE,
                    selected_page: selected_index,
                });
                console.log(ResponseMessage.USER_MESSAGE);
                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: ResponseMessage.SERVER_MESSAGE,
                    selected_page: selected_index,
                });
                console.log(ResponseMessage.SERVER_MESSAGE);
                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: resp.body.error,
                    selected_page: selected_index,
                });
                console.log(resp.body.error);
                return;
            }
        }

        console.log(resp.body);
        this.setState({
            ...this.state,
            loading: false,
            error: '',
            contentBlocks: resp.body ? [...resp.body] : [],
            selected_page: selected_index,
        });
    }

    createContainer() {
        let result: Array<VDomNode> = [];

        let variant = this.props.card_variant;
        if (!variant) {
            variant = 'profile';
        }

        if (variant !== 'sold') {
            this.state.contentBlocks.forEach((block) => {
                result.push(createComponent(
                    Card,
                    { 
                        variant: variant as CardVariants,
                        ...block as CardProps, },
                ));
            });            
        } else {
            this.state.contentBlocks.forEach((block) => {
                result.push(createComponent(
                    OrderCard,
                    { 
                        variant: variant as OrderCardType,
                        ...block as OrderCardProps, },
                ));
            });
        }

        return result;
    }

    render() {
        let option = this.props.options[this.state.selected_page];

        return createElement(
            'div',
            { class: 'profile-page', },
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
                        selected_index: this.getSelectedIndex(),
                        options: this.getMenuOptions(),
                    },
                ) : createText(''),
            createElement(
                'div',
                { class: 'profile-content-block', },
                (this.state.loading) ?
                    createComponent(
                        Loader, { },
                    ) :
                (this.state.contentBlocks && this.state.contentBlocks.length > 0) ?
                    createElement(
                        'div',
                        { class: 'profile-content-block-full', },
                        ...this.createContainer(),
                    ) :
                    createElement(
                        'div', 
                        { class: 'profile-content-block-empty', },
                        createComponent(
                            ProfilePlaceholder,
                            {
                                text: option.empty_message,
                            },
                        ),
                        (option.empty_button_text) ?
                            createComponent(
                                Button,
                                {
                                    text: option.empty_button_text,
                                    variant: 'primary',
                                    onclick: () => { 
                                        if (option.empty_button_onclick) {
                                            option.empty_button_onclick();
                                        } 
                                    },
                                },
                            ) : createText(''),
                    ),
            )
        )
    }
}