import './loader.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Svg } from '../baseComponents/index';

import loader from '../../assets/icons/loader.svg';

export class Loader extends Component<never, never> {

    render() {

        return createElement(
            'loader',
            {},
            createComponent(
                Svg,
                { content: loader, class: 'loader-regular rotating' },
            ),
        );
    }
}
