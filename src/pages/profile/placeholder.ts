import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../components/baseComponents/snail/vdom/VirtualDOM';
import placeholder from '../../assets/icons/placeholder.svg';
import { Svg, Text } from '../../components/baseComponents/index';

interface ProfilePlaceholderProps {
    text: string
}

export class ProfilePlaceholder extends Component<ProfilePlaceholderProps, never> {

    public render() {
        if (!this.props) {
            throw new Error('ProfilePlaceholder props undefined');
        }

        return createElement(
            'div',
            {class: 'fav-container-placeholder'},
            createComponent(
                Svg,
                {
                    content: placeholder,
                    width: 190,
                    height: 120,
                },
            ),
            createComponent(
                Text,
                {
                    text: this.props?.text,
                    variant: 'regular',
                },
            ),
        );
    }
}
