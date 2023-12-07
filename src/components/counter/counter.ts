import './counter.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Button, Text } from '../baseComponents/index';

import dec from '../../assets/icons/dec.svg';
import inc from '../../assets/icons/inc.svg';

export interface CounterProps {
    unitPrice: number,
    minCount: number,
    maxCount: number,
    selectedCount: number,
    counterInfluence: (count: number) => void,
}

type CounterButtonStyleType = {
    pointerEvents: 'auto' | 'none',
    opacity: '1' | '0.5',
}

export interface CounterState {
    currentCount: number,
    price: number,
}

export class Counter extends Component<CounterProps, CounterState> {

    generateStyle(style: CounterButtonStyleType): string {
        let result = '';
        Object.entries(style).forEach(([ key, value ]) => {
            result += key + ': ' + value + ';';
        });

        return result;
    }

    getVisibleStyle(param: number) {
        if (!this.props || !this.state) {
            throw new Error('Counter settings are undefined');
        }

        if (this.state.currentCount == param) {
            return this.generateStyle({ pointerEvents: 'none', opacity: '0.5' });
        }

return this.generateStyle({ pointerEvents: 'auto', opacity: '1' });
    }

    decCount() {
        if (!this.props || !this.state) {
            throw new Error('Counter settings are undefined');
        }

        if (this.state.currentCount > this.props.minCount) {
            this.state.currentCount -= 1;
            this.state.price -= this.props.unitPrice;
            this.setState({ ...this.state });
            this.props.counterInfluence(this.state.currentCount);
        }
    }

    incCount() {
        if (!this.props || !this.state) {
            throw new Error('Counter settings are undefined');
        }

        if (this.state.currentCount < this.props.maxCount) {
            this.state.currentCount += 1;
            this.state.price += this.props.unitPrice;
            this.setState({ ...this.state });
            this.props.counterInfluence(this.state.currentCount);
        }
    }

    render() {
        if (!this.props) {
            throw new Error('Counter settings are undefined');
        }

        if (!this.state) {
            this.state = {
                currentCount: this.props.selectedCount,
                price: this.props.unitPrice * this.props.selectedCount,
            };
        }

        return createElement(
            'div', { class: 'counter' },
            createElement(
                'div', { class: 'counter-result' },
                createComponent(
                    Text,
                    {
                        variant: 'header',
                        text: this.state.price + ' ₽',
                    },
                ),
            ),
            createElement(
                'div', { class: 'counter-manager' },
                createComponent(
                    Button,
                    {
                        variant: 'neutral',
                        leftIcon: { content: dec, width: 25, height: 25 },
                        style: this.getVisibleStyle(this.props.minCount),
                        onclick: () => { this.decCount(); },
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        variant: 'header',
                        text: this.state.currentCount,
                        className: 'counter-count',
                    },
                ),
                createComponent(
                    Button,
                    {
                        variant: 'neutral',
                        leftIcon: { content: inc, width: 25, height: 25 },
                        style: this.getVisibleStyle(this.props.maxCount),
                        onclick: () => { this.incCount(); },
                    },
                ),
            ),
        );
    }
}
