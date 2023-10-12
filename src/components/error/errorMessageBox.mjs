import { stringToElement } from '../../shared/utils/parsing.mjs';

export const ErrorMessageBox = (error) => {
    const template = Handlebars.templates[ 'errorMessageBox.hbs' ];

    return stringToElement(template({ text: error }));
};
