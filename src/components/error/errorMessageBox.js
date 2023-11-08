import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './errorMessageBox.hbs'
import './errorMessageBox.scss';

export const ErrorMessageBox = (error, id=null) => {
    const template = Template;

    return stringToElement(template({ text: error, id: id }));
};
