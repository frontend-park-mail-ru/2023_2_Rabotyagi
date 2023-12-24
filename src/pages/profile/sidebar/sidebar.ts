import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../components/loader/Loader';
import { Menu } from '../menu/menu';
import { Image, Text, TextLinkProps } from '../../../components/baseComponents/index';

import UserStore from '../../../shared/store/user';

import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import Navigate from '../../../shared/services/router/Navigate';

import list from '../../../assets/icons/list.svg';
import heart from '../../../assets/icons/heart.svg';
import settings from '../../../assets/icons/settings.svg';
import cart from '../../../assets/icons/cart.svg';
import comment from '../../../assets/icons/comment.svg';

type SidebarTypes = 'default' | 'saler';

interface SidebarState extends UserModel {
    variant: SidebarTypes
}

export class Sidebar extends Component<never, SidebarState> {
    private userStoreListener = () => {
        this.setState({...(UserStore.getFields() as SidebarState), variant: 'default'});
    };

    constructor() {
        super();

        const regex = new RegExp('/profile/saler.+');

        if (regex.exec(location.pathname + location.search)) {
            this.fetchSalerProfile();
        }
        else {
            this.state = {...(UserStore.getFields() as SidebarState), variant: 'default'};
        }
    }

    public componentDidMount(): void {
        if (this.state?.variant === 'default') {
            this;
            UserStore.addStoreUpdater(this.userStoreListener);
        }

    }

    public componentWillUnmount(): void {
        if (this.state?.variant === 'default') {
            this;
            UserStore.removeStoreUpdater(this.userStoreListener);
        }
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
            ...resp.body as SidebarState,
            variant: 'saler',
        });
    }

    routeToProfile = () => {
        if (this.state?.variant === 'saler'){
            Navigate.navigateTo(`/profile${'/saler?id=' + this.state.id }`, {salerId: this.state.id});

            return;
        }
        Navigate.navigateTo('/profile');
    };

    routeToProducts = () => {
        if (this.state?.variant === 'saler') {
            Navigate.navigateTo('/profile/saler/products', { salerId: this.state.id});

            return;
        }
        Navigate.navigateTo('/profile/products');
    };
    routeToOrders = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }orders/buy`);
    routeToFavourites = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }favourites`);
    routeToComments = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }comments`);
    routeToSettings = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }settings`);

    getSelectedOption() {
        let path = location.pathname.split('/');
        if (path.length < 3) {
            return 0;
        }
        switch (path[2]) {
            case 'products':
                return 0;
            case 'orders':
                return 1;
            case 'favourites':
                return 2;
            case 'comments':
                return 3;
            case 'settings':
                return 4;
            default:
                return 0;
        }
    }

    public render() {
        let tail;

        if (!this.state) {
            tail = createComponent(
                Loader,
                {},
            );
        }
        else {
            let btnGroup: Array<TextLinkProps> = [
                {
                    text: 'Объявления',
                    icon: {
                        content: list,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToProducts,
                },
            ];
            if (this.state.variant === 'default') {
                btnGroup = [
                    ...btnGroup,
                    {
                        text: 'Заказы',
                        icon: {
                            content: cart,
                            width: 24,
                            height: 24,
                        },
                        onclick: this.routeToOrders,
                    },
                    {
                        text: 'Избранное',
                        icon: {
                            content: heart,
                            width: 24,
                            height: 24,
                        },
                        onclick: this.routeToFavourites,
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
                    {
                        text: 'Настройки',
                        icon: {
                            content: settings,
                            width: 24,
                            height: 24,
                        },
                        onclick: this.routeToSettings,
                    },
                ];
            }

            tail = createElement(
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
                        style: 'width: 80px; height: 80px; position: relative; background: rgba(41, 44, 47, 0.25)',
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

        return tail;
    }
}
