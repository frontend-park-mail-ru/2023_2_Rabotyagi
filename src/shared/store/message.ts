import { Store } from '../services/store/Store';

import { VDomNode, createText } from '../../components/baseComponents/snail/vdom/VirtualDOM';

export enum MessageStoreAction {
    SHOW_MESSAGE = 'SHOW_MESSAGE',
    HIDE_MESSAGE = 'HIDE_MESSAGE',
}

export interface MessageStoreInterface {
    content: VDomNode,
    visible: boolean,
}

const initMessageStoreState: MessageStoreInterface = {
    content: createText(''),
    visible: false,
};

export class MessageStore extends Store<MessageStoreInterface> {

    private showContent(newNode: VDomNode) {
        if (!this.state.visible) {
            this.state.content = newNode;
            this.state.visible = true;
        }
    }

    private hideContent() {
        this.state.content = createText('');
        this.state.visible = false;
    }

    public getVisible() {
        return this.state.visible;
    }

    public getMessage() {
        return this.state.content;
    }

    public addActions() {
        this.addAction({
            name: MessageStoreAction.SHOW_MESSAGE,
            operation: ({payload}: {payload: VDomNode}) => { this.showContent(payload); },
        });
        this.addAction({
            name: MessageStoreAction.HIDE_MESSAGE,
            operation: () => { this.hideContent(); },
        });
    }
}

export default new MessageStore(initMessageStoreState);

