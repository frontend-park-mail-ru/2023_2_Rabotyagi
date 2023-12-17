import './priceHistory.scss';

import { Component } from '../baseComponents/snail/component';
import { createComponent, createElement } from '../baseComponents/snail/vdom/VirtualDOM';

import { Text } from '../baseComponents/index';

import { getRuFormat } from '../../shared/utils/dateConverter';

export interface PriceHistoryProps {
    points: Array<productPriceUnit>,
    price: number,
}

export interface PriceHistoryState {
    graphicPadding: number,
}

export type PriceHistoryGrowingClass = 'up' | 'down' | 'line';

export class PriceHistory extends Component<PriceHistoryProps, PriceHistoryState> {

    state = {
        graphicPadding: 5,
    };

    currentPrice() {
        if (!this.props) {
            throw new Error('PriceHistory settings are undefined');
        }

        return this.props.points[this.props.points.length - 1].price;
    }

    maxPrice() {
        if (!this.props) {
            throw new Error('PriceHistory settings are undefined');
        }

        return Math.max(...this.props.points.map(element => element.price));
    }

    minPrice() {
        if (!this.props) {
            throw new Error('PriceHistory settings are undefined');
        }

        return Math.min(...this.props.points.map(element => element.price));
    }

    graphicYLength() {
        if (!this.props) {
            throw new Error('PriceHistory settings are undefined');
        }

        return this.maxPrice() - this.minPrice();
    }

    startTime(points: Array<productPriceUnit>) {
        return points[0].created_at;
    }

    endTime(points: Array<productPriceUnit>) {
        return points[points.length - 1].created_at;
    }

    getGrowingClass(points: Array<productPriceUnit>): PriceHistoryGrowingClass {
        const reversePoints = points.reverse();
        const nextUnequalElement = reversePoints.find((element) => element.price !== reversePoints[0].price);
        if (!nextUnequalElement) {
            return 'line';
        }
        if (nextUnequalElement.price > reversePoints[0].price) {
            return 'up';
        }

return 'down';
    }

    getYCoor(price: number, minPrice: number, priceLength: number): number {
        if (priceLength === 0) {
            return this.state.graphicPadding;
        }

        let result = 100 - (price - minPrice) / priceLength * 100;
        if (result == 0)
            result += this.state.graphicPadding;
        if (result == 100)
            result -= this.state.graphicPadding;

return result;
    }

    getDayDifference(fDate: string, lDate?: string) {
        const firstDate = new Date(fDate);
        const lastDate = lDate ? new Date(lDate) : new Date();

        return Math.ceil(Math.abs(lastDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24));
    }

    getXCoor(date: string, minDate: string, dateLength: number): number {
        if (dateLength == 0) {
            return 100;
        }

        let result = this.getDayDifference(minDate, date) / dateLength * 100;
        if (result == 0)
            result += this.state.graphicPadding;
        if (result == 100)
            result -= this.state.graphicPadding;

return result;
    }

    pointsToString(): string {
        if (!this.props || !this.props.price) {
            throw new Error('PriceHistory settings are undefined');
        }

        const result: Array<string> = [];
        const minPrice = this.minPrice();
        const priceLength = this.maxPrice() - this.minPrice();

        const firstDate = this.props.points[0].created_at;
        const dateLength = this.getDayDifference(firstDate);

        this.props.points.forEach((point) => {
            const xCoor = this.getXCoor(point.created_at, firstDate, dateLength).toString();
            const yCoor = this.getYCoor(point.price, minPrice, priceLength).toString();
            result.push([xCoor, yCoor].join(','));
        });

        const lastXCoor = 100;
        const lastYCoor = this.getYCoor(this.props.price, minPrice, priceLength);
        result.push([lastXCoor, lastYCoor].join(','));

        return result.join(' ');
    }

    getDifferenceTitle(minPrice: number, maxPrice: number) {
        if (maxPrice !== minPrice) {
            return 'Цена менялась от ' + this.minPrice() + ' ₽ до ' + this.maxPrice() + ' ₽'
        }   

        return minPrice.toString() + ' ₽'; 
    }

    render() {
        if (!this.props) {
            throw new Error('PriceHistory settings are undefined');
        }

        /*if (this.props.points.length == 0) {
            throw new Error('Points must have at least one point');
        }*/

        console.log(this.props);

        return createElement(
            'div',
            { class: 'price-history' },
            createComponent(
                Text,
                {
                    tag: 'p',
                    variant: 'subheader',
                    text: 'История цены',
                    style: 'margin-bottom: 10px;',
                },
            ),
            createComponent(
                Text,
                {
                    tag: 'p',
                    variant: 'regular',
                    text: this.getDifferenceTitle(this.minPrice(), this.maxPrice()),
                },
            ),
            createElement(
                'div',
                { class: 'price-history-svg' },
                createElement(
                    'svg',
                    {
                        // необходимы значения 100, чтобы координаты точек соотвествовали процентам от ширины и высоты
                        'viewBox': '0 0 100 100',
                        // необходимо для того, чтобы график растягивался на всю ширину
                        'preserveAspectRatio': 'none',
                    },
                    createElement(
                        'polyline',
                        {
                            // делает толщину линии постоянной
                            'vector-effect': 'non-scaling-stroke',
                            'points': this.pointsToString(),
                        },
                    ),
                ),
            ),
            createElement(
                'div',
                { class: 'price-history-xtitle' },
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        variant: 'regular',
                        text: getRuFormat(this.props.points[0].created_at),
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'div',
                        variant: 'regular',
                        text: getRuFormat(this.props.points[this.props.points.length - 1].created_at),
                    },
                ),
            ),
        );
    }
}
