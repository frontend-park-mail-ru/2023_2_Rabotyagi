import './Signup.scss';

import { Component } from '../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../components/baseComponents/snail/vdom/VirtualDOM';

import { Caption } from '../../components/Caption/Caption';
import { Text, Button, TextInput, ErrorMessageBox, PasswordField } from '../../components/baseComponents/index';

import Navigate from '../../shared/services/router/Navigate';

import logo from '../../assets/icons/logo.svg';
import { Validate } from '../../shared/utils/validation';
import { Auth } from '../../shared/api/auth';
import { ResponseMessage, ResponseStatusChecker } from '../../shared/constants/response';
import { login } from '../../shared/store/commonActions/auth';

export interface SignupPageState {
    error: string,
    email: string,
    password: string,
    repeatPassword: string,
}

export class SignupPage extends Component<never, SignupPageState> {
    keyupEvent = (e: KeyboardEvent) => {
        if (e.key === 'Enter'){
            this.signupEvent();
        }
    };

    state = {
        error: '',
        email: '',
        password: '',
        repeatPassword: '',
    };

    constructor(){
        super();

        document.title = 'GoodsGalaxy | Регистрация';
    }

    public componentDidMount(): void {
        document.body.addEventListener('keyup', this.keyupEvent);
    }

    public componentWillUnmount(): void {
        document.body.removeEventListener('keyup', this.keyupEvent);
    }

    setError(error: string) {
        this.setState({
            error: error,
        } as SignupPageState);
    }

    check(): string | null {
        const errorEmail = Validate.email(this.state.email);
        if (errorEmail) {
            return errorEmail;
        }

        const errorPassword = Validate.password(this.state.password);
        if (errorPassword) {
            return errorPassword;
        }

        const errorPasswordRep = Validate.password(this.state.repeatPassword);
        if (errorPasswordRep) {
            return errorPasswordRep;
        }

        const passEqual = Validate.passwordEqual(this.state.password, this.state.repeatPassword);
        if (passEqual) {
            return passEqual;
        }

        return null;
    }

    signupEvent = async() => {
        const error = this.check();

        if (error){
            this.setError(error);

            return;
        }

        let resp;

        try {
            resp = await Auth.signup(this.state.email, this.state.password);
        } catch (err) {
            console.error(err);

            return;
        }

        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            if (ResponseStatusChecker.IsBadFormatRequest(resp)) {
                this.setError(ResponseMessage.USER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(resp)) {
                this.setError(ResponseMessage.SERVER_MESSAGE);

                return;
            }
            else if (ResponseStatusChecker.IsUserError(resp)) {
                this.setError(resp.body.error);

                return;
            }
        }

        await login();

        Navigate.navigateTo('/');
    };

    render() {
        return createElement(
            'div',
            { class: 'signup' },
            createElement(
                'div',
                { class: 'signup_content' },
                createComponent(
                    Button,
                    {
                        leftIcon: { content: logo },
                        variant: 'neutral',
                        subvariant: 'outlined',
                        style: 'height: auto; padding: 0;',
                        onclick: () => { Navigate.navigateTo('/'); },
                    },
                ),
                createComponent(
                    Text,
                    {
                        tag: 'p',
                        variant: 'subheader',
                        text: 'Регистрация в «GoodsGalaxy»',
                    },
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: 'Электронная почта',
                        autocomplete: 'email',
                        required: true,
                        class: 'input-field',
                        oninput: (e: Event) => {
                            this.state.email = (e.target as HTMLInputElement).value;
                        },
                    },
                ),
                createComponent(
                    PasswordField, {
                        oninput: (e: Event) => {
                            this.state.password = (e.target as HTMLInputElement).value;
                        },
                    },
                ),
                createComponent(
                    PasswordField, {
                        oninput: (e: Event) => {
                            this.state.repeatPassword = (e.target as HTMLInputElement).value;
                        },
                    },
                ),
                (this.state.error !== '') ?
                    createComponent(
                        ErrorMessageBox,
                        { text: this.state.error },
                    ) : createText(''),
                createComponent(
                    Button,
                    {
                        variant: 'primary',
                        text: 'Продолжить',
                        style: 'width: 100%;',
                        type: 'submit',
                        onclick: this.signupEvent,
                    },
                ),
            ),
            createElement(
                'div',
                { class: 'info' },
                createComponent(
                    Caption,
                    { text: 'Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности' },
                ),
                createComponent(
                    Caption,
                    { text: 'Передаваемые данные' },
                ),
            ),
        );
    }

}
