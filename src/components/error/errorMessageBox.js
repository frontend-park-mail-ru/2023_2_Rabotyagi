import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './errorMessageBox.hbs';
import './errorMessageBox.scss';

/**
 * Функция рендера
 * @date 11/13/2023 - 11:17:50 PM
 * @param {string} error Текст ошибки
 * @param {string} [id=null] Айдишник элемента
 **/
export const ErrorMessageBox = (error, id=null) => {
    const template = Template;

    return stringToElement(template({ text: error, id: id }));
};
