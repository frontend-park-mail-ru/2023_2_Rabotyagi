import { VDomPropsType } from './VirtualDOM';

enum SvgTags {
    SVG = 'svg',
    POLYLINE = 'polyline',
    PATH = 'path',
}

const basicXMLNS = 'http://www.w3.org/2000/svg';

export const checkTagLikeSvgTag = (tag: string): boolean => {
    return Object.values(SvgTags).includes(tag as SvgTags);
};

export const getXMLNS = (nodeProps?: VDomPropsType): string => {
    if (!nodeProps) {
        return basicXMLNS;
    }
    if (!nodeProps['xmlns']) {
        return basicXMLNS;
    }

    return nodeProps['xmlns'].toString();
};
