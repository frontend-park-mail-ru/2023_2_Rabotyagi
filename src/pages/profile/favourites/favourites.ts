import './favourite.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Svg, Text } from '../../../components/baseComponents/index';
import { Card, CardProps } from '../../../components/card/Card';

import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';

import placeholder from '../../../assets/icons/placeholder.svg';

interface ProfileFavouritesState {
    items: Array<object>
}

export class ProfileFavourites extends Component<never, ProfileFavouritesState> {
    state: ProfileFavouritesState = {
        items: [],
    };

    constructor() {
        super();

        this.getFavs();
    }

    createFavs() {
        debugger;
        if (this.state.items.length === 0) {
            // debugger;

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
                    variant: 'favourite',
                    ...item as CardProps,
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

        if (resp.body && resp.body.length > 0) {
            this.setState({
                items: resp.body,
            });
        }

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
