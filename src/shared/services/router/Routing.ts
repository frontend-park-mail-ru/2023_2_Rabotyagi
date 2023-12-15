import { Component } from '../../../components/baseComponents/snail/component';
import { createElement, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import Navigate from './Navigate';

export interface RouteProps {
    path: RegExp,
    callback?: () => void
}

// у компонента Route может быть только 1 ребёнок
export class Route extends Component<RouteProps, never> {
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

        const route = this.children.find((child) => {
            if (child.kind != 'component') {
                throw new Error('Router child must be Route component');
            }

            switch (child.component.name) {
                case 'Route':
                    break;
                case '_': // @FIX Почему-то на проде *name* у **Route** получается '_'
                    break;
                default:
                    throw new Error('Router child must be Route component');
            }

            // данное решение применяется только для Роутера в качестве исключения
            // в других случаях лучше избегать просмотра внутренних свойств детей
            const access = (name: string): any => {
                if (!child.props) {
                    throw new Error('');
                }

                return child.props[name as keyof typeof child.props];
            };

            return access('path').exec(location.pathname + location.search);
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
