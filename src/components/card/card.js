/**
 * @file card.js
 */
import { stringToElement } from '../../shared/utils/parsing.js';
import './card.scss'
import Handlebars from 'handlebars/runtime';
import template from './card.hbs'
import templateProfile from './card-profile.hbs'
import button from '../button/button.js';
import { Product } from '../../shared/api/product.js';
import { getResourceUrl } from '../../shared/utils/getResource.js';


const buttons = {
    delete: () => button({
        id: 'btn-delete',
        variant: 'outlined',
        text: {
            class: 'text-regular',
            content: 'Удалить'
        },
        style: 'width: 100%;'
    }),

    activate: () => button({
        id: 'btn-active',
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Активировать'
        },
        style: 'width: 100%;'
    }),

    deactivate: () => button({
        id: 'btn-deactive',
        variant: 'primary',
        text: {
            class: 'text-regular',
            content: 'Деактивировать'
        },
        style: 'width: 100%;'
    }),
}

/**
 * Description placeholder
 * @date 11/13/2023 - 10:04:14 PM
 * 
 * @class
 * @export
 * @module Components
 */
export class Card {
    
    /**
     * Creates an instance of Card.
     * @date 11/13/2023 - 10:04:29 PM
     *
     * @constructor
     * @param {Object} context контекст для рендера
     * @param {string} [variant='default'] вариант карточки
     */
    constructor(context, variant='default') {
        this.context = context;
        this.variant = variant;
        this.context.images = getResourceUrl(this.context.images);
        if (this.context.images) {
            this.context.image = this.context.images[ 0 ];
        }
    }
    
    
    /**
     * @date 11/13/2023 - 10:08:05 PM
     * 
     * @summary Асинхронно формирует карточку варианта профиля пользователя
     * @async
     * @returns {void}
     */
    async renderProfile(){
        this.root = stringToElement(templateProfile(this.context));
        const btnDelete = buttons.delete();
        const btnActive = buttons.activate();
        const btnDeactive = buttons.deactivate();
        
        btnDelete.addEventListener('click', async (e) => {
            e.stopPropagation();
            const res = await Product.delete(Number(this.context.id));

            if (res.status === 200) {
                this.root.remove();
            }
        });

        this.root.querySelector('#btn-delete')?.replaceWith(btnDelete);

        if (!this.context.is_active) {
            btnDelete.before(btnActive);
        }
        else {
            btnDelete.before(btnDeactive);
        }

        btnDelete.previousElementSibling.addEventListener('click', async (e) => {
            e.stopPropagation();

            const res = await Product.patch(this.context.id, {
                is_active: !this.context.is_active,
            });
            body = res.body;

            this.root.remove();
        })
    }
    
    /**
     * @date 11/13/2023 - 10:07:47 PM
     * 
     * @summary Асинхронно формирует карточку варианта чужого профиля
     * @method
     * @async
     * @returns {void}
     */
    async renderProfileSaler(){
        this.root = stringToElement(templateProfile(this.context));
    }
    
    
    /**
     * @date 11/13/2023 - 10:07:57 PM
     * 
     * @summary Асинхронно формирует карточку дефолтного варианта
     * @method
     * @async
     * @returns {void}
     */
    async renderDefault() {
        this.root = stringToElement(template(this.context));
    }

    /**
     * @date 11/13/2023 - 10:03:54 PM
     * 
     * @summary Главный метод класса
     * @description Формирует в зависимости от параметра variant элемент и возвращает
     * @method
     * @returns {HTMLElement}
     */
    render() {
        Handlebars.registerHelper('haveBadges', function () {
            return (this.safe_deal || this.delivery);
        });

        switch(this.variant) {
            case 'profile':
                this.renderProfile();
                break;
            case 'profile-saler':
                this.renderProfileSaler();
                break;
            default:
                this.renderDefault();
                break;
        }

        this.root.addEventListener('click', (e) => {
            e.stopPropagation();
            
            window.Router.navigateTo('/product', { productId: this.context.id })
        });

        return this.root;
    }
}
