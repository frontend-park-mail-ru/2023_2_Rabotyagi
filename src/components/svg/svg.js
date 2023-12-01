import { stringToElement } from '../../shared/utils/parsing';

const svg = ({
    content,
    // id = null,
    // variant = null,
    // size = null,
    width = 60,
    height = 60,
}) => {
    const root = stringToElement(content);
    root.style.width = width;
    root.style.height = height;

    return root;
};

export default svg;
