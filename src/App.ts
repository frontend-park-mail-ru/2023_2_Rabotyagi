import { Component } from './components/baseComponents/snail/component';
import { createComponent, createElement } from './components/baseComponents/snail/vdom/VirtualDOM';

import { Router, Route } from './shared/services/router/Routing';

import { SigninPage } from './pages/signin/SigninPage';
import { SignupPage } from './pages/signup/SignupPage';
import { MainPage } from './pages/main/Main';

import { login } from './shared/store/commonActions/auth';

export class App extends Component<never, never> {

    render() {

        login();

        return createElement(
            'div',
            { id: 'root' },
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
