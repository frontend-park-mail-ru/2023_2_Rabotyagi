import { Component } from './components/baseComponents/snail/component';
import { createComponent, createElement } from './components/baseComponents/snail/vdom/VirtualDOM';

import { Router, Route } from './shared/services/router/Routing';

import { SigninPage } from './pages/signin/SigninPage';
import { SignupPage } from './pages/signup/SignupPage';
import { MainPage } from './pages/main/Main';

import { login } from './shared/store/commonActions/auth';
import { Loader } from './components/loader/Loader';

interface AppState {
    loading: boolean
}

export class App extends Component<never, AppState> {
    constructor() {
        super();
        this.state = {
            loading: true,
        };

        this.loader();
    }

    async loader() {
        await login();
        this.setState({
            loading: false,
        });
    }

    render() {

        return createElement(
            'div',
            {id: 'root'},
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
            ),

        );
    }
}
