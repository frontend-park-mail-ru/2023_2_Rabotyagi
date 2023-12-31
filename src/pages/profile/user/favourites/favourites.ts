import './favourite.scss';

import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { ProfilePlaceholder } from '../../placeholder/placeholder';
import { Loader } from '../../../../components/loader/Loader';
import { Card, CardProps } from '../../../../components/card/Card';
import { Text } from '../../../../components/baseComponents';

import { UserApi } from '../../../../shared/api/user';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

interface ProfileFavouritesState {
    items: Array<CardProps>,
    isLoading: boolean,
}

export class ProfileFavourites extends Component<never, ProfileFavouritesState> {
    state: ProfileFavouritesState = {
        items: [],
        isLoading: true,
    };

    public componentDidMount() {
        this.getFavs();
    }

    async getFavs() {
        let resp;

        try {
            resp = await UserApi.getFavs();

        } catch (err) {
            console.error(err);

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {

            return;
        }

        this.setState({
            items: (resp.body === null ? [] : resp.body),
            isLoading: false,
        });

        return;
    }

    public deleteFavFromArray(index: number) {
        this.setState({
            ...this.state,
            items: this.state.items.filter((elem: CardProps) => elem.id !== index),
        });
    }

    createFavs() {
        if (this.state.isLoading) {

            return [
                createComponent(
                    Loader,
                    {},
                ),
            ];
        }

        if (this.state.items.length === 0) {

            return [
                createComponent(
                    ProfilePlaceholder,
                    {
                        text: 'Все добавленные объявления будут отображаться на этой вкладке',
                    },
                ),
            ];
        }

        return this.state.items.map((item) =>
            createComponent(
                Card,
                {
                    ...item,
                    variant: 'favourite',
                    favouriteInfluence: (index: number) => { this.deleteFavFromArray(index); },
                },
            ),
        );
    }

    public render() {

        return createElement(
            'div',
            { class: 'favs', },
            createComponent(
                Text,
                {
                    tag: 'div',
                    variant: 'subheader',
                    text: 'Избранное',
                    style: 'padding-bottom: 32px;',
                },
            ),
            createElement(
                'div',
                { class: 'fav-container', },
                ...this.createFavs(),
            ),
        );
    }
}
