export abstract class Component {
    protected domElement: HTMLElement | null = null;
    protected tmpl: string;
    protected attrs: Object | null = null;

    constructor(tmpl: string, attrs?: Object) {
        this.tmpl = tmpl;

        if (attrs) {
            this.attrs = attrs;
        }
    }
    
    update() {
        if (!this.domElement){
            throw new Error('domElement is null');
        }
        
        this.renderTo(this.domElement.parentNode as HTMLElement);
    }

    renderTo(element: HTMLElement) {
        element.innerHTML = this.render();
        this.domElement = element.childNodes[0] as HTMLElement;

        if (!this.isRendered) {
            this.isRendered = true;
            this.onMount();
        }

        this.didMount();
    }

    protected onMount() {}
    protected didMount() {}
    protected onUpdate() {}
    protected onDestroy() {}

    protected abstract render(): string;

    protected triggerEvent<D>(eventName: string, detail?: D) {
        this.domElement.dispatchEvent(
            new CustomEvent(eventName, {
                bubbles: true,
                detail,
            })
        );

        return false;
    }

    private isRendered = false;
}

export const useState = (value : any) => {
    if (!(this as any instanceof Component)) {
        throw new Error('useState must be used inside Component <3');
    }

    const ref = this;

    const callback = (newValue : any) => {
        value = newValue;
        ref.update();
    }

    return [value, callback];
}