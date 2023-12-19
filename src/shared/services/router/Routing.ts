import { Component } from '../../../components/baseComponents/snail/component';
import { VDomComponent, createElement, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import Navigate from './Navigate';

export interface RouteProps {
    path: RegExp,
    callback?: () => void
}

// у компонента Route может быть только 1 ребёнок
export class Route extends Component<RouteProps, never> {
    public get path(): RegExp {
        if (!this.props) {
            throw new Error('');
        }

        return this.props.path;
    }

    render() {
        if (!this.children) {
            throw new Error('Route children are undefined');
        }
        if (this.children.length > 1) {
            throw new Error('Route have only 1 child');
        }

        if (this.props?.callback) {
            this.props.callback();
        }

        return this.children[0];
    }
}

export class Router extends Component<never, never> {

    // связка Роутера и Навигатора
    public componentDidMount(): void {
        Navigate.addCallback(() => {
            this.applyComponentChanges();
        });
    }

    render() {
        if (!this.props) {
            throw new Error('props are undefined');
        }
        if (!this.children) {
            throw new Error('children are undefined');
        }

        const route = (this.children).find((child) => {
            if (child.key !== 'Route'){
                throw new Error('Router child must be Route component');
            }

            const props = (child as VDomComponent).props as RouteProps;

            return props.path.exec(location.pathname + location.search);
        });

        if (route) {
            return route;
        }

        return createElement(
            'div', { },
            createText('Ошибка при роутинге'),
        );
    }
}
