import './feed.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';
import { Text } from '../baseComponents/index';
import { Card, CardProps } from '../card/Card';
import { Loader } from '../loader/Loader';
import { Product } from '../../shared/api/product';
import { ResponseStatusChecker } from '../../shared/constants/response';

interface FeedProps {

}

interface FeedState {
    products: Array<CardProps>
}

export class Feed extends Component<FeedProps, FeedState> {
    state: FeedState = {
        products: [],
    };

    constructor(){
        super();

        this.getProductList();
    }

    async getProductList() {
        let resp;

        try {
            resp = await Product.feed();
        } catch (err) {
            console.error(err);

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {

                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {

                return;
            }
        }

        this.setState({
            products: resp.body,
        });
    }

    createCards = () => {
        if (this.state.products.length === 0) {
            return [createComponent(
                Loader,
                {},
            )];
        }
        else {
            return this.state.products.map((cardProps) =>
            createComponent(
                Card,
                {
                    ...cardProps,
                },
            ));
        }
    };

    public render(): VDomNode {

        return createElement(
            'div',
            {
                class: 'feed',
            },
            createComponent(
                Text,
                {
                    text: 'Все объявления',
                    variant: 'subheader',
                },
            ),
            createElement(
                'div',
                {
                    class: 'feed-content',
                },
                ...this.createCards(),
            ),
        );
    }
}

// <div class="feed">
//     <div class="feed-header">
//         <span class="text-header">{{this.feedName}}</span>
//         {{!-- <button class="btn-primary"><span class="text-regular">Выбор города</span></button> --}}
//     </div>
//     <div class="feed-content"></div>
// </div>
