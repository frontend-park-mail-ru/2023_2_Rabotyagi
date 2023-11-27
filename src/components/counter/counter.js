import { stringToElement } from '../../shared/utils/parsing.js';
import template from './counter.hbs';
import './counter.scss';

import inc from '../../assets/icons/inc.svg';
import dec from '../../assets/icons/dec.svg';
import svg from '../svg/svg.js';
import button from '../button/button.js';

/**
 * @class
 * @classdesc Класс счётчика
 */
export class Counter {
    #unitPrice;
    #maxCount;
    #minCount;
    #currentCount;
    #price;
    #counterFunc;
    #incVisible;
    #decVisible;

    constructor({ unitPrice, minCount, maxCount, currentCount, counterFunc }) {
        this.#unitPrice = unitPrice;
        this.#minCount = minCount;
        this.#maxCount = maxCount;
        this.#currentCount = currentCount;
        this.#price = this.#unitPrice * this.#currentCount;
        this.#counterFunc = counterFunc;

        this.context = {
            name: '',
        };
        this.root = stringToElement(template(this.context));
        this.counterResult = this.root.querySelector('div.counter-result');
        this.counterManager = this.root.querySelector('div.counter-manager');

        this.updateVisible();

        this.decButton = button({
            id: 'decBtn',
            variant: 'neutral',
            leftIcon: svg({
                content: dec,
                width: 25,
                height: 25,
            }),
        });
        this.incButton = button({
            id: 'incBtn',
            variant: 'neutral',
            leftIcon: svg({
                content: inc,
                width: 25,
                height: 25,
            }),
        });

        this.decButton.addEventListener('click', () => {
            this.decCount();
        });
        this.incButton.addEventListener('click', () => {
            this.incCount();
        });
    }

    renderButton(visible, idName) {
        if (visible) {
            this.counterManager.querySelector(idName).style.opacity = '1';
            this.counterManager.querySelector(idName).style.pointerEvents = 'auto';
        } else {
            this.counterManager.querySelector(idName).style.opacity = '0.5';
            this.counterManager.querySelector(idName).style.pointerEvents = 'none';
        }
    }

    reRenderResult() {
        this.counterResult.querySelector('span.full-price').innerHTML = this.#price;
        this.counterManager.querySelector('div.counter-count').innerHTML = this.#currentCount;
        this.renderButton(this.#incVisible, '#incBtn');
        this.renderButton(this.#decVisible, '#decBtn');
    }

    updateVisible() {
        this.#incVisible = (this.#currentCount === this.#maxCount) ? false : true;
        this.#decVisible = (this.#currentCount === this.#minCount) ? false : true;
    }

    incCount() {
        if (this.#currentCount < this.#maxCount) {
            this.#currentCount += 1;
            this.updateVisible();
            this.#price += this.#unitPrice;
            this.reRenderResult();
            this.#counterFunc(this.#currentCount);
        }
    }

    decCount() {
        if (this.#currentCount > this.#minCount) {
            this.#currentCount -= 1;
            this.updateVisible();
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

        this.counterManager.querySelector('#incBtn').replaceWith(this.incButton);
        this.counterManager.querySelector('#decBtn').replaceWith(this.decButton);
        this.renderButton(this.#incVisible, '#incBtn');
        this.renderButton(this.#decVisible, '#decBtn');
        this.counterManager.querySelector('div.counter-count').innerHTML = this.#currentCount;

        return this.root;
    }
}
