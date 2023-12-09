import { VDomNodeUpdater, applyChanges, getDifference } from './vdom/Difference';
import { VDomNode } from './vdom/VirtualDOM';

export abstract class Component<PropsType, StateType> {

    protected props: PropsType | undefined;
    protected state: StateType | undefined;
    protected children: Array<VDomNode> = [];

    private node: VDomNode | undefined;
    private domElement: HTMLElement | Text | undefined;

    protected applyComponentChanges() {
        if (!this.domElement) {
            throw new Error('domelement is undefined');
        }

        applyChanges(this.domElement, this.getComponentDifference());
    }

    public setState(state: StateType): void {
        if (!this.domElement) {
            throw new Error('domelement is undefined');
        }

        this.state = {...this.state, ...state};
        this.applyComponentChanges();
    }

    public setProps(props: PropsType): VDomNodeUpdater | null {
        if (!this.domElement) {

            return null;
        }

        this.state = this.componentWillRecieveProps(props, this.state);
        this.props = props;

        return this.getComponentDifference();
    }

    public setChildren(children: Array<VDomNode>) {
        this.children = [...children];
    }

    public initProps(props: PropsType | undefined): VDomNode {
        this.props = props;
        this.node = this.render();

        return this.node;
    }

    public notifyMounted(element: HTMLElement | Text) {
        this.domElement = element;
        // необходимо для асинхронного выполнения
        setTimeout(() => {
            this.componentDidMount();
        });
    }

    public unmount() {
        this.componentWillUnmount();
        // this.domElement?.remove();
        this.domElement = undefined;
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
                this.domElement = element;
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
