/**
 * @file main.js
 * @module Main
 */

import './assets/css/index.scss';
import { App } from './App';

import { renderToElementDyId, createComponent } from './components/baseComponents/snail/vdom/VirtualDOM';

const renderApp = () => {
    renderToElementDyId('root', createComponent(App, { key: 'app' }));
};

renderApp();
