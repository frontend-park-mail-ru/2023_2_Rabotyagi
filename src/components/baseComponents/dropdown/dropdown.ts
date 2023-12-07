import './dropdown.scss';

import { Component } from '../snail/component';
import { VDomNode, createElement, createComponent, createText } from '../snail/vdom/VirtualDOM';

import { Svg } from '../svg/Svg';
import { TextInput } from '../Input/Input';

import searchIcon from '../../../assets/icons/search.svg';

// примечания к решению:
// прдеполагается, что dropdown всегда будет привязан к компоненту выше
// то есть всегда есть кнопка или строка ввода, которая влияет на состояние компонента dropdown извне
// внешнее воздействие на компонент осуществляется через его пропсы

interface DropdownProps {
    search?: boolean,
}

interface DropDownState {
    hidden: boolean;
}

export class Dropdown extends Component<DropdownProps, DropDownState> {
    protected state: DropDownState = {
        hidden: true,
    };

    // switchHiddenDOMEvent = (e: Event) => {
    //     debugger;
    //     if ((e.target as HTMLElement) != (this.domElement?.parentElement || this.domElement)){
    //         this.switchHidden();
    //     }

    // };

    switchHidden() {
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    // public componentDidMount(): void {
    //     document.body.addEventListener('click', this.switchHiddenDOMEvent);
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
            (!this.state.hidden) ?
            createElement(
                'div',
                { class: 'dropdown-content' },
                ...this.children,
            ) : createText(''),
        );
    }

    // public componentWillUnmount(): void {
    //     document.body.removeEventListener('click', this.switchHiddenDOMEvent);
    // }
}
