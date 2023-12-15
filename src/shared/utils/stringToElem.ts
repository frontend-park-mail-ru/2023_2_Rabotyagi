export function stringToElement(tmpl: string): HTMLElement {
    const template = document.createElement('template');

    tmpl = tmpl.trim();
    template.innerHTML = tmpl;

    return template.content.firstChild as HTMLElement;
}
