import './dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../svg/Svg';
import { TextInput } from '../input/Input';

import searchIcon from '../../../assets/icons/search.svg';

// примечания к решению:
// прдеполагается, что dropdown всегда будет привязан к компоненту выше
// то есть всегда есть кнопка или строка ввода, которая влияет на состояние компонента dropdown извне
// внешнее воздействие на компонент осуществляется через его пропсы

interface DropdownProps {
    search?: boolean,
    hidden?: boolean,
}

interface DropDownState {
    hidden: boolean,
    // buf?: boolean,
}

export class Dropdown extends Component<DropdownProps, DropDownState> {
    protected state: DropDownState = {
        hidden: true,
        // buf: true,
    };

    // switchHiddenDOMEvent = (e: Event) => {
    //     debugger;
    //     if ((e.target as HTMLElement) != (this.domElement?.parentElement || this.domElement) && !this.state.hidden){
    //         this.switchHidden();
    //     }

    // };

    // public componentWillRecieveProps(props: DropdownProps, state: DropDownState | undefined): DropDownState | undefined {
    //     if (props.hidden){
    //         this.state.hidden = props.hidden;
    //     }

    //     return this.state;
    // }

    switchHidden() {
        // this.state.buf = !this.state.buf;
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    // clickEvent = () => {
    //     debugger;
    //     if (!this.state.buf) {
    //         this.switchHidden();
    //     }
    //     else {
    //         this.state.buf = false;
    //     }
    // };

    // public componentDidMount(): void {
    //     document.body.addEventListener('click', this.switchHiddenDOMEvent);
    // }

    // public componentWillUnmount(): void {
    //     document.body.removeEventListener('click', this.switchHiddenDOMEvent);
    // }

    public render(): VDomNode {
        if (!this.props) {
            throw new Error('Dropdown props are undefined');
        }

        return createElement(
            'div',
            {
                class: 'dropdown-container',
                style: 'top: 44px;',
                hidden: this.state.hidden,
            },
            (this.props.search) ?
            createElement(
                'div',
                { class: 'dropdown-search' },
                createComponent(
                    Svg, { content: searchIcon },
                ),
                createComponent(
                    TextInput, {},
                ),
            ) : createText(''),
            (!this.state.hidden && this.children && this.children.length !== 0) ?
            createElement(
                'div',
                { class: 'dropdown-content' },
                ...this.children,
            ) : createText(''),
        );
    }
}
