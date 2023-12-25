import './feed.scss';

import { Component } from '../baseComponents/snail/component';
import { VDomNode, createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Loader } from '../loader/Loader';
import { Text } from '../baseComponents/index';

import { ProductApi } from '../../shared/api/product';
import { ResponseStatusChecker } from '../../shared/constants/response';

import Navigate from '../../shared/services/router/Navigate';
import { useDebounce } from '../baseComponents/snail/use/debounce';
import { Card, CardProps } from '../card/Card';

interface FeedState {
    products: Array<CardProps>,
}

export class Feed extends Component<never, FeedState> {

    state: FeedState = {
        products: [],
    };

    endOfProducts = false;

    constructor(){
        super();

        Navigate.addCallback(this.updateEvent);
    }

    async addLoading() {
        let res;

        try {
            res = await ProductApi.feed(this.state.products.length);
        }
        catch {
            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
            return;
        }

        if (!res.body){
            this.endOfProducts = true;

            return;
        }

        if (res.body.length < 1) {
            this.endOfProducts = true;

            return;
        }

        this.setState({
            products: [...this.state.products, ...res.body],
        });
    }

    scrollEndEvent = () => {
        if (this.endOfProducts) {

            return;
        }
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
            document.body.clientHeight;
            this.setState({
                products: this.state.products,
            });
            this.addLoading();
        }
    };

    public componentDidMount(): void {
        this.updateEvent();
        window.addEventListener('scroll', this.scrollEndEvent);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollEndEvent);
        Navigate.removeCallback(this.updateEvent);
    }

    updateEvent = () => {
        if (history.state?.products) {
            this.setState({
                products: history.state.products,
            });
        }
        else {
            this.getProductList();
        }
    };

    getProductList = useDebounce<void, void>(async() => {
        let resp;

        try {
            resp = await ProductApi.feed();
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
            products: resp.body ? resp.body : [],
        });
    }, 500);

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
