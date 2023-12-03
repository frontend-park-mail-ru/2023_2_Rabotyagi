import { Component } from './components/baseComponents/snail/component';
import { createComponent, createElement } from './components/baseComponents/snail/vdom/VirtualDOM';

import { Router, Route } from './shared/services/router/Routing';

import { Signin } from './pages/Signin/Signin';
import { Signup } from './pages/Signup/Signup';

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
                    createElement(
                        'div', { }
                    )
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/signin$') },
                    createComponent(
                        Signin, { }
                    )
                ),
                createComponent(
                    Route,
                    { path: new RegExp('^/signup$') },
                    createComponent(
                        Signup, { }
                    )
                )
            )
        )
    };
};
