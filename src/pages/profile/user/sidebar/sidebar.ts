import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../../../../components/loader/Loader';
import { Menu } from '../../menu/menu';
import { Image, Text, TextLinkProps } from '../../../../components/baseComponents/index';

import UserStore from '../../../../shared/store/user';
import Navigate from '../../../../shared/services/router/Navigate';

import list from '../../../../assets/icons/list.svg';
import heart from '../../../../assets/icons/heart.svg';
import settings from '../../../../assets/icons/settings.svg';
import cart from '../../../../assets/icons/cart.svg';
import comment from '../../../../assets/icons/comment.svg';

type UserSidebarTypes = 'default' | 'saler';

interface UserSidebarState extends UserModel {
    variant: UserSidebarTypes
}

export class UserSidebar extends Component<never, UserSidebarState> {
    private userStoreListener = () => {
        this.setState({...(UserStore.getFields() as UserSidebarState), variant: 'default'});
    };

    constructor() {
        super();

        this.state = {...(UserStore.getFields() as UserSidebarState), variant: 'default'};
    }

    public componentDidMount(): void {
        UserStore.addStoreUpdater(this.userStoreListener);

    }

    public componentWillUnmount(): void {
        UserStore.removeStoreUpdater(this.userStoreListener);
    }

    routeToProfile = () => Navigate.navigateTo('/profile');

    routeToProducts = () => {
        if (this.state?.variant === 'saler') {
            Navigate.navigateTo('/saler/products', { salerId: this.state.id});

            return;
        }
        Navigate.navigateTo('/profile/products');
    };
    routeToOrders = () => Navigate.navigateTo('/profile/orders/buy');
    routeToFavourites = () => Navigate.navigateTo('/profile/favourites');
    routeToComments = () => Navigate.navigateTo('/profile/comments');
    routeToSettings = () => Navigate.navigateTo('/profile/settings');

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
                    text: 'Настройки',
                    icon: {
                        content: settings,
                        width: 24,
                        height: 24,
                    },
                    onclick: this.routeToSettings,
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
                createComponent(
                    Image,
                    {
                        width: 80,
                        height: 80,
                        style: 'align-self: center;',
                        src: this.state.avatar,
                        variant: 'avatar',
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
