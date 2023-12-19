import { useState } from './use/state';
import { VDomNodeUpdater, applyChanges, getDifference } from './vdom/Difference';
import { VDomNode } from './vdom/VirtualDOM';

export abstract class Component<PropsType, StateType> {

    protected props: PropsType;
    protected state: StateType | undefined;
    protected children: Array<VDomNode> = [];
    protected useState;

    private node: VDomNode | undefined;
    private _domElement: HTMLElement | SVGSVGElement | Text | undefined;

    constructor(props: PropsType = {} as PropsType) {
        this.props = props;
        this.useState = (initState: any) => useState.apply(this, [initState]);
    }

    protected applyComponentChanges() {
        if (!this._domElement) {
            // throw new Error('domelement is undefined');
            return;
        }

        applyChanges(this._domElement, this.getComponentDifference());
    }

    public get domElement() {
        // return this._domElement?.cloneNode();
        return this._domElement;
    }

    public setState(state: StateType): void {
        if (this._domElement) {
            this.state = {...this.state, ...state};
            this.applyComponentChanges();
            // throw new Error('domelement is undefined');
        }

    }

    public setProps(props: PropsType): VDomNodeUpdater | null {
        if (!this._domElement) {

            return null;
        }

        this.state = this.componentWillRecieveProps(props, this.state);
        this.props = props;

        return this.getComponentDifference();
    }

    public setChildren(children: Array<VDomNode>) {
        this.children = [...children];
        this.applyComponentChanges();
    }

    public initProps(props: PropsType): VDomNode {
        this.props = props;
        this.node = this.render();

        return this.node;
    }

    public notifyMounted(element: HTMLElement | SVGSVGElement | Text) {
        this._domElement = element;
        // необходимо для асинхронного выполнения
        setTimeout(() => {
            this.componentDidMount();
        });
    }

    public unmount() {
        this.componentWillUnmount();
        // this._domElement?.remove();
        this._domElement = undefined;
    }

    public componentDidMount() {}
    public componentDidUpdate() {}
    public componentWillUnmount() {}

    // эта функция определят влияние параметров на состояние компонента
    public componentWillRecieveProps(
        props: PropsType,
        state: StateType | undefined,
    ): StateType | undefined
    {
        return state;
    }

    private getComponentDifference(): VDomNodeUpdater {
        if (!this.node) {
            this.node = this.initProps(this.props);
        }

        const newNode = this.render();
        const difference = getDifference(this.node, newNode);
        if (difference.kind == 'replace') {
            // передаём стрелочную функцию для сохранения контекста
            // здесь не вызывается notifyMounted, так как он учатсвует в жизненном цикле компонента
            difference.callback = (element) => {
                this._domElement = element;
            };
        }
        this.node = newNode;
        // необходимо для асинхронного выполнения
        setTimeout(() => {
            this.componentDidUpdate();
        });

        return difference;
    }

    public abstract render(): VDomNode;
}
