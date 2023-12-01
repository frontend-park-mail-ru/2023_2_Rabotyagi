import { stringToElement } from '../../shared/utils/parsing';
import template from './button.hbs';
import './button.scss'; //eslint-disable-line no-unused-vars

const button = ({
    id = null,
    variant = null,
    link = null,
    subVariant = null,
    style = null,
    leftIcon = null,
    rightIcon = null,
    text = {
        class: null,
        content: null,
    },
    name = null,
    type = null,
}) => {
    const root = stringToElement(template({id, variant: `button-${variant}`, link, subVariant, style, name, type, text}));

    if (leftIcon){
        root.querySelector('#leftIcon').replaceWith(leftIcon);
    }
    else {
        root.querySelector('#leftIcon').remove();
    }

    if (text == undefined) {
        root.querySelector('span').remove();
    }

    if (rightIcon){
        root.querySelector('#rightIcon').replaceWith(rightIcon);
    }
    else {
        root.querySelector('#rightIcon').remove();
    }

    if (link){
        root.dataset.link = link;
    }

    return root;
};

export default button;
