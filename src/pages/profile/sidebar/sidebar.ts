import { Button, Image, Text } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import UserStore from '../../../shared/store/src/user';
import list from '../../../assets/icons/list.svg';
import heart from '../../../assets/icons/heart.svg';
import settings from '../../../assets/icons/settings.svg';
import cart from '../../../assets/icons/cart.svg';
import Navigate from '../../../shared/services/router/Navigate';
import { UserApi } from '../../../shared/api/user';
import { Loader } from '../../../components/loader/Loader';
import { ResponseStatusChecker } from '../../../shared/constants/response';

type SidebarTypes = 'default' | 'saler';

interface SidebarState extends UserModel {
    variant: SidebarTypes
}

export class Sidebar extends Component<never, SidebarState> {

    constructor() {
        super();

        const regex = new RegExp('/profile/saler.+');

        if (regex.exec(location.pathname + location.search)) {
            this.fetchSalerProfile();
        }
        else {
            this.state = {...(UserStore.getFields() as SidebarState), variant: 'default'};
        }

        // if (!this.props || !this.props.variant || this.props.variant === 'default') {
        //     this.state = UserStore.getFields() as SidebarState;
        // }
        // else if (this.props.variant === 'saler') {
        //     this.fetchSalerProfile();
        // }
    }

    async fetchSalerProfile() {
        const salerId = Number((new URLSearchParams(window.location.search)).get('id'));

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

    routeToProfile = () => Navigate.navigateTo(`/profile${this.state?.variant === 'saler' ? '/saler?id=' + this.state.id : '' }`);
    routeToProducts = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }products`);
    routeToOrders = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }orders`);
    routeToFavourites = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }favourites`);
    routeToSettings = () => Navigate.navigateTo(`/profile/${this.state?.variant === 'saler' ? 'saler/' : '' }settings`);

    public render() {
        let tail;

        if (!this.state) {
            tail = createComponent(
                Loader,
                {},
            );
        }
        else {
            let btnGroup: Array<VDomComponent> = [
                    createComponent(
                        Button,
                        {
                            text: 'Объявления',
                            variant: 'neutral',
                            subvariant: 'tertiary',
                            leftIcon: {
                                content: list,
                                width: 24,
                                height: 24,
                            },
                            onclick: this.routeToProducts,
                        },
                    ),
            ];
            if (this.state.variant === 'default') {
                btnGroup = [
                    ...btnGroup,
                    createComponent(
                        Button,
                        {
                            text: 'Заказы',
                            variant: 'neutral',
                            subvariant: 'tertiary',
                            leftIcon: {
                                content: cart,
                                width: 24,
                                height: 24,
                            },
                            onclick: this.routeToOrders,
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Избранное',
                            variant: 'neutral',
                            subvariant: 'tertiary',
                            leftIcon: {
                                content: heart,
                                width: 24,
                                height: 24,
                            },
                            onclick: this.routeToFavourites,
                        },
                    ),
                    createComponent(
                        Button,
                        {
                            text: 'Настройки',
                            variant: 'neutral',
                            subvariant: 'tertiary',
                            leftIcon: {
                                content: settings,
                                width: 24,
                                height: 24,
                            },
                            onclick: this.routeToSettings,
                        },
                    ),
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
                createElement(
                    'div',
                    {
                        style: 'align-self: stretch; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex',
                    },
                    (this.state.avatar) ?
                    createComponent(
                        Image,
                        {
                            width: 80,
                            height: 80,
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
                        Button,
                        {
                            text: 'Обзор',
                            variant: 'outlined',
                            onclick: this.routeToProfile,
                        },
                    ),
                ),
                ...btnGroup,
            );
        }

        return tail;
    }
}
