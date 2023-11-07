import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './counter.hbs';
import './counter.scss';

import inc from '../../assets/icons/inc.svg';
import dec from '../../assets/icons/dec.svg';
import svg from '../svg/svg.js';
import button from '../button/button.js';

export class Counter {
    #unitPrice;
    #maxCount;
    #minCount;
    #currentCount;
    #price;
    #counterFunc;

    constructor({ unitPrice, minCount, maxCount, currentCount, counterFunc }) {
        this.#unitPrice = unitPrice;
        this.#minCount = minCount;
        this.#maxCount = maxCount;
        this.#currentCount = currentCount;
        this.#price = this.#unitPrice * this.#currentCount;
        this.#counterFunc = counterFunc;

        this.template = Template;
        this.context = {
            name: ''
        };
        this.root = stringToElement(this.template(this.context));
        this.counterResult = this.root.querySelector('div.counter-result');
        this.counterManager = this.root.querySelector('div.counter-manager');
    }

    reRenderResult() {
        this.counterResult.querySelector('span.full-price').innerHTML = this.#price;
        this.counterManager.querySelector('div.counter-count').innerHTML = this.#currentCount;
    }

    incCount() {
        if (this.#currentCount < this.#maxCount) {
            this.#currentCount += 1;
            this.#price += this.#unitPrice;
            this.reRenderResult();
            this.#counterFunc(this.#currentCount);
        }
    }

    decCount() {
        if (this.#currentCount > this.#minCount) {
            this.#currentCount -= 1;
            this.#price -= this.#unitPrice;
            this.reRenderResult();
            this.#counterFunc(this.#currentCount);
        }
    }

    getPrice() {
        return this.#price;
    }

    render() {
        this.counterResult.querySelector('span.full-price').innerHTML = this.#price;

        const decButton = button({
            id: 'decBtn',
            variant: 'neutral',
            leftIcon: svg({ 
                content: dec,
                width: 25,
                height: 25
            }),
        });

        const incButton = button({
            id: 'decBtn',
            variant: 'neutral',
            leftIcon: svg({ 
                content: inc,
                width: 25,
                height: 25
            }),
        });

        decButton.addEventListener('click', (e) => {
            this.decCount();
        });
        incButton.addEventListener('click', (e) => {
            this.incCount();
        });

        this.counterManager.querySelector('#decBtn').replaceWith(decButton);
        this.counterManager.querySelector('#incBtn').replaceWith(incButton);
        this.counterManager.querySelector('div.counter-count').innerHTML = this.#currentCount;

        return this.root;
    }
}
