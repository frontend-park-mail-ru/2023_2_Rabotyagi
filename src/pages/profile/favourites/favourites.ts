import './favourite.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Svg, Text } from '../../../components/baseComponents/index';
import { Card, CardProps } from '../../../components/card/Card';

import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import placeholder from '../../../assets/icons/placeholder.svg';

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

    public deleteFavFromArray(index: number) {
        this.setState({
            ...this.state,
            items: this.state.items.filter((elem: CardProps) => elem.id !== index),
        });
    }

    createFavs() {
        //debugger;
        if (this.state.isLoading) {

            return [
                createComponent(
                    Text, 
                    { 
                        variant: 'subheader',
                        text: 'Идёт загрузка...',
                    },
                ),
            ];
        }

        if (this.state.items.length === 0) {

            return [
                createElement(
                    'div',
                    {class: 'fav-container-placeholder'},
                    createComponent(
                        Svg,
                        {
                            content: placeholder,
                            width: 190,
                            height: 120,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Все добавленные объявления будут отображаться на этой вкладке',
                            variant: 'regular',
                        },
                    ),
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

    public render() {

        return createElement(
            'div',
            {class: 'fav-container'},
            ...this.createFavs(),
        );
    }
}
