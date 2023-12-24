import { Component } from './components/baseComponents/snail/component';
import { createComponent, createElement } from './components/baseComponents/snail/vdom/VirtualDOM';

import { Router, Route } from './shared/services/router/Routing';

import { SigninPage } from './pages/signin/SigninPage';
import { SignupPage } from './pages/signup/SignupPage';
import { MainPage } from './pages/main/Main';
import { CartPage } from './pages/cart/CartPage';

import { login } from './shared/store/commonActions/auth';
import { Loader } from './components/loader/Loader';
import { Product } from './pages/product/product';
import { Profile } from './pages/profile/profile';
import CityStore from './shared/store/city'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { getOrders } from './shared/store/commonActions/getOrders';

import MessageStore from './shared/store/message'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { MessageBox } from './components/baseComponents';

interface AppState {
    loading: boolean
}

export class App extends Component<never, AppState> {
    state: AppState = {
        loading: true,
    };

    async loader() {
        await login();
        await getOrders();

        this.setState({
            loading: false,
        });
    }

    public componentDidMount(): void {
        this.loader();
    }

    render() {

        return createElement(
            'div',
            {id: 'root'},
            createComponent(
                MessageBox, {},
            ),
            (this.state?.loading) ?
            createComponent(
                Loader,
                {},
            )
            :
            createComponent(
                Router,
                { },
                createComponent(
                    Route,
                    { path: new RegExp('^/$') },
                    createComponent(
                        MainPage,
                        { },
                    ),
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/signin$') },
                    createComponent(
                        SigninPage, { },
                    ),
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/signup$') },
                    createComponent(
                        SignupPage, { },
                    ),
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/product.*') },
                    createComponent(
                        Product, { },
                    ),
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/profile.*') },
                    createComponent(
                        Profile, { },
                    ),
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/cart$') },
                    createComponent(
                        CartPage, { },
                    ),
                ),
            ),
        );
    }
}
