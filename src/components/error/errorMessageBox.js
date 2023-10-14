import { stringToElement } from '../../shared/utils/parsing.js';
import Template from './errorMessageBox.hbs'

export const ErrorMessageBox = (error) => {
    const template = Template;

    return stringToElement(template({ text: error }));
};
