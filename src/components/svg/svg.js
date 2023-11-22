import { stringToElement } from '../../shared/utils/parsing';

//eslint-disable-next-line no-unused-vars
const config = {
    id: null,
    variant: null,
    size: null,
    width: 60,
    height: 60,
};

const svg = (params) => {
    const root = stringToElement(params.content);
    root.style.width = params.width ? params.width : 60;
    root.style.height = params.height ? params.height : 60;

    return root;
};

export default svg;
