import { stringToElement } from '../../shared/utils/parsing';
import template from './button.hbs';
import styles from './button.scss'; //eslint-disable-line no-unused-vars

//eslint-disable-next-line no-unused-vars
const config = {
    id: null,
    variant: null,
    link: null,
    subVariant: null,
    style: null,
    leftIcon: null,
    rightIcon: null,
    text: {
        class: null,
        content: null,
    }
}

const button = (context) => {
    switch (context.variant) {
        case 'primary':
            context.variant = 'btn-primary';
            break;
        case 'neutral':
            context.variant = 'btn-neutral';
            break;
        case 'secondary':
            context.variant = 'btn-secondary';
            break;
        case 'accent':
            context.variant = 'btn-accent';
            break;
    }
    const root = stringToElement(template(context));

    if (context.leftIcon){
        root.querySelector('#leftIcon').replaceWith(context.leftIcon);
    }
    else {
        root.querySelector('#leftIcon').remove();
    }

    if (context.text == undefined) {
        root.querySelector('span').remove();
    }

    if (context.rightIcon){
        root.querySelector('#rightIcon').replaceWith(context.rightIcon);
    }
    else {
        root.querySelector('#rightIcon').remove();
    }

    if (context.link){
        root.dataset.link = context.link;
    }
    
    return root;
}


export default button;