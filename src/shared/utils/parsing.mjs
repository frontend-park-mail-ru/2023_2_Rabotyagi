/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function stringToElement(string) {
    var template = document.createElement('template');
    string = string.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = string;
    return template.content.firstChild;
}
