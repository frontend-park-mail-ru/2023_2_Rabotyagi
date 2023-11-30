/**
 * @param {String} string HTML элемент в виде строки
 * @return {Element}
 */
export function stringToElement(string: string): HTMLElement | null {
    const template = document.createElement('template');
    string = string.trim();
    template.innerHTML = string;

    return template.content.firstChild as HTMLElement;
}
