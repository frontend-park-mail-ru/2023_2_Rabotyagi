import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../../components/loader/loader';
import { Menu } from '../../menu/menu';
import { Image, Text, TextLinkProps } from '../../../../components/baseComponents/index';

import UserStore from '../../../../shared/store/user';

import { UserApi } from '../../../../shared/api/user';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

import Navigate from '../../../../shared/services/router/Navigate';

import list from '../../../../assets/icons/list.svg';
import heart from '../../../../assets/icons/heart.svg';
import settings from '../../../../assets/icons/settings.svg';
import cart from '../../../../assets/icons/cart.svg';
import comment from '../../../../assets/icons/comment.svg';

interface SalerSidebarState extends UserModel {}

export class SalerSidebar extends Component<never, SalerSidebarState> {
    constructor() {
        super();

        this.fetchSalerProfile();
    }

    async fetchSalerProfile() {
        let salerId = Number((new URLSearchParams(window.location.search)).get('id'));
        if (!salerId){
            salerId = history.state.salerId;
        }

        let resp;

        try {
            resp = await UserApi.getProfile(salerId);
        }
        catch (err) {
            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                // this.setError(ResponseMessage.USER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                // this.setError(ResponseMessage.SERVER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                // this.setError(resp.body.error);

                return;
            }
        }

        this.setState({
            ...resp.body as SalerSidebarState,
        });
    }

    routeToProducts = () => Navigate.navigateTo('/saler/products', { salerId: this.state?.id});
    routeToComments = () => Navigate.navigateTo('/saler/comments', { salerId: this.state?.id});

    getSelectedOption() {
        const path = location.pathname.split('/');
        if (path.length < 3) {
            return 0;
        }
        switch (path[2]) {
            case 'products':
                return 0;
            case 'comments':
                return 1;
            case 'orders':
                return 2;
            case 'favourites':
                return 3;
            case 'settings':
                return 4;
            default:
                return 0;
        }
    }

    public render() {

        if (!this.state) {
            return createComponent(
                Loader,
                {},
            );
        }
        else {
            const btnGroup: Array<TextLinkProps> = [
                {
                    text: 'Объявления',
                    icon: {
                        content: list,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToProducts,
                },
                {
                    text: 'Отзывы',
                    icon: {
                        content: comment,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToComments,
                },
            ];

            return createElement(
                'sidebar',
                {
                    class: 'profile-sidebar',
                },
                createComponent(
                    Text,
                    {
                        text: this.state.name ? this.state.name : this.state.email,
                        variant: 'subheader',
                    },
                ),
                (this.state.avatar) ?
                createComponent(
                    Image,
                    {
                        width: 80,
                        height: 80,
                        style: 'align-self: center;',
                        src: this.state.avatar,
                    },
                )
                :
                createElement(
                    'div',
                    {
                        style: 'width: -webkit-fill-available; height: 80px; position: relative; background: rgba(41, 44, 47, 0.25)',
                    },
                ),
                createComponent(
                    Menu,
                    {
                        selectedIndex: this.getSelectedOption(),
                        options: btnGroup,
                    },
                ),
            );
        }
    }
}
