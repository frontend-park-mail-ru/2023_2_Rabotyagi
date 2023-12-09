import './settings.scss';
import { Button, FileInput, Text, TextInput } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import user, { UserStoreAction } from '../../../shared/store/user';
import { UserModel, UserModelPatch } from '../../../shared/models/user';
import Dispatcher from '../../../shared/services/store/Dispatcher';
import { UserApi } from '../../../shared/api/user';
import { ResponseStatusChecker } from '../../../shared/constants/response';
import { Files } from '../../../shared/api/file';

type inputFields = UserModelPatch & {
    forUpload?: File,
}

interface ProfileSettingsState {
    inputFields?: inputFields,
    user?: UserModel
}

export class ProfileSettings extends Component<never, ProfileSettingsState> {
    emailField?: HTMLInputElement;
    phoneField?: HTMLInputElement;
    nameField?: HTMLInputElement;
    avatarField?: HTMLInputElement;

    state: ProfileSettingsState = {
        inputFields: {},
    };

    public componentDidMount(): void {
        user.addStoreUpdater(this.listener);

        Dispatcher.dispatch({
            name: UserStoreAction.REFRESH,
        });
    }

    public componentWillUnmount(): void {
        user.removeStoreUpdater(this.listener);
    }

    clear = () => {
        delete this.state.inputFields;

        if (this.emailField){
            this.emailField.value = '';
            // delete this.state.inputFields?.email;
        }

        if (this.phoneField) {
            this.phoneField.value = '';
            // delete this.state.inputFields?.phone;
        }

        if (this.nameField) {
            this.nameField.value = '';
            // delete this.state.inputFields?.name;
        }
    };

    clearEvent = (e: Event) => {
        e.preventDefault();

        this.clear();
    };

    listener = () => {
        const fields = user.getFields();

        if (fields) {
            this.setState({
                user: {...fields},
            });
        }
    };

    async uploadAvatar() {
        if (this.state.inputFields?.forUpload) {

            let res;

            try {
                res = await Files.images(this.state.inputFields.forUpload);
            }
            catch(err) {
                console.error(err);
            }

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                console.error(new Error(res.body.error));

                return;
            }

            this.state.inputFields.avatar = res.body.urls[ 0 ];
        }
    }

    private formSubmit = async(e: Event) => {
        e.preventDefault();

        await this.uploadAvatar();

        let res;
        try {
            res = await UserApi.patchProfile({...this.state.inputFields});
        }
        catch(err) {
            console.error(err);

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
            console.error(new Error(res.body.error));

            return;
        }

        this.clear();

        Dispatcher.dispatch({
            name: UserStoreAction.UPDATE,
            payload: res.body as UserModel,
        });
    };

    setAvatar = (e: Event) => {
        const input = (e.currentTarget as HTMLInputElement);
        if (!this.avatarField) {
            this.avatarField = input;
        }
        if (this.state.inputFields && input.files) {
            this.state.inputFields.forUpload = input.files[0];
        }
    };

    setName = (e: Event) => {
        if (!this.nameField) {
            this.nameField = (e.currentTarget as HTMLInputElement);
        }
        if (this.state.inputFields) {
            this.state.inputFields.name = (e.currentTarget as HTMLInputElement).value;
        }
    };

    setEmail = (e: Event) => {
        if (!this.emailField) {
            this.emailField = (e.currentTarget as HTMLInputElement);
        }
        if (this.state.inputFields) {
            this.state.inputFields.email = (e.currentTarget as HTMLInputElement).value;
        }
    };

    setPhone = (e: Event) => {
        if (!this.phoneField) {
            this.phoneField = (e.currentTarget as HTMLInputElement);
        }
        if (this.state.inputFields) {
            this.state.inputFields.phone = (e.currentTarget as HTMLInputElement).value;
        }
    };

    public render() {
        this;

        return createElement(
            'settings',
            {
                class: 'settings',
            },
            createElement(
                'form',
                {
                    class: 'settings-content',
                    onsubmit: this.formSubmit,
                },
                createComponent(
                    Text,
                    {
                        text: 'Аватарка',
                    },
                ),
                createComponent(
                    FileInput,
                    {
                        accept: '.png, .jpg, .jpeg',
                        multiple: false,
                        oninput: this.setAvatar,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Имя',
                    },
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: this.state?.user?.name ? this.state?.user?.name : '',
                        oninput: this.setName,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Телефон',
                    },
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: this.state?.user?.phone ? this.state?.user.phone : '',
                        oninput: this.setPhone,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Почта',
                    },
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: this.state?.user?.email ? this.state?.user?.email : '',
                        oninput: this.setPhone,
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Сохранить',
                        variant: 'primary',
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Отменить',
                        variant: 'neutral',
                        subvariant: 'primary',
                        onclick: this.clearEvent,
                    },
                ),
            ),
        );
    }
}
