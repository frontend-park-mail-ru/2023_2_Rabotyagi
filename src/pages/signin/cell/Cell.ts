import './Cell.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Svg, Text } from '../../../components/baseComponents/index';

export interface CellProps {
    svgIcon: string,
    text: string
}

export interface CellState {
    svgSize: number,
    textStyle: string
}

export class Cell extends Component<CellProps, CellState> {

    state = {
        svgSize: 25,
        textStyle: 'color: var(--text-secondary);',
    };

    render() {
        if (!this.props) {
            throw new Error('Cell settings are undefined');
        }

        return createElement(
            'div',
            { class: 'cell' },
            createComponent(
                Svg,
                {
                    content: this.props.svgIcon,
                    height: this.state.svgSize,
                    width: this.state.svgSize,
                },
            ),
            createComponent(
                Text,
                {
                    text: this.props.text,
                    style: this.state.textStyle,
                },
            ),
        );
    }
}
