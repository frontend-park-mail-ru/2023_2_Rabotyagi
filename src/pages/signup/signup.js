/**
 * @module signupPage
 * @file signupPage.js
 */

import { store } from '../../shared/store/store.js';
import { cookieParser } from '../../shared/utils/cookie.js';
import Validate from '../../shared/utils/validation.js';
import { Auth } from '../../shared/api/auth.js';
import { ErrorMessageBox } from '../../components/error/errorMessageBox.js';
import { stringToElement } from '../../shared/utils/parsing.js';
import template from './signup.hbs'
import './signup.scss' // eslint-disable-line no-unused-vars
import button from '../../components/button/button.js';
import svg from '../../components/svg/svg.js';
import logo from '../../assets/icons/logo.svg'

export class SignupPage {
    /**
     * #check() validate email, password and repeated password
     * @param {string} email - email
     * @param {string} pass - password
     * @param {string} repeatPass - repeated password
     * @return {null|string} return null if validation ok and return string if not
     */
    #check({ email, password, passwordRepeat }) {

        const errEmail = Validate.email(email);
        if (errEmail) {
            return errEmail;
        }

        // const errName = Validate.name(name);
        // if (errName) {
        //     return errName;
        // }

        // const errPhone = Validate.phone(phone);
        // if (errPhone) {
        //     return errPhone;
        // }

        const errPassword = Validate.password(password);
        if (errPassword) {
            return errPassword;
        }


        password = password.trim();
        passwordRepeat = passwordRepeat.trim();

        if (password !== passwordRepeat) {
            return 'Пароли не совпадают';
        }

        return null;
    }

    async signup({ email, password }, errorBox) {
        try {
            const resp = await Auth.signup(email, password);
            const body = resp.body;

            if (resp.status != 200) {
                errorBox.innerHTML = '';
                errorBox.appendChild(ErrorMessageBox(body.error));
                return false;
            }
            const cookies = cookieParser(document.cookie);
            store.user.login(cookies);
            store.cart.clear();
            window.Router.navigateTo('/');
            return true;
        } catch (err) {
            errorBox.innerHTML = '';
            errorBox.appendChild(ErrorMessageBox(err));
            return false;
        }
    }

    signupEvent(container) {
        var handler = async (e) => {
            if ((e.type === 'submit') || (e.type === 'keydown' && e.code === 'Enter')) {
                e.preventDefault();

                const { elements } = container;
                const data = Array.from(elements)
                .filter((item) => !!item.name && !!item.value)
                .map((element) => {
                    const { name, value } = element
                    return { [ name ]: value }
                })

                let body = {};
                data?.forEach((elem) => body = { ...body, ...elem });

                const error = this.#check(body);

                const errorBox = container.querySelector('#errorBox');
    
                if (error) {
                    errorBox.innerHTML = '';
                    errorBox.appendChild(ErrorMessageBox(error));
                    return;
                }
    
                const res = await this.signup(body, errorBox);
                if (res) {
                    document.body.removeEventListener('keydown', handler);
                }
            }
        }

        return handler;
    }

    /**
     * @summary Рендер функция
     * @returns {HTMLElement}
     */
    render() {
        document.title = 'Регистрация';

        const root = stringToElement(template());

        const container = root.querySelector('.content');

        container.querySelector('#btnSubmit').replaceWith(button({
            variant: 'primary',
            style: 'width: 100%',
            text: {
                content: 'Продолжить',
                class: 'text-regular'
            },
            type: 'submit'
        }));

        container.addEventListener('submit', this.signupEvent(container));
        document.body.addEventListener('keydown', this.signupEvent(container));



        container.querySelector('#logo-btn').replaceWith(button({
            leftIcon: svg({ content: logo }),
            link: '/',
            variant: 'neutral',
            subVariant: 'outlined',
            style: 'height: auto; padding: 0;'
        }));
        container.querySelectorAll('button[data-link]').forEach(item => 
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                window.Router.navigateTo(item.dataset.link);
            }, { capture: false })
        );

        // document.createElement('button').addEventListener('')
        
        container.querySelectorAll('button[name="show"]').forEach((elem) =>
            elem.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                e.preventDefault();
                this.previousElementSibling.type = 'text';
            })
        );

        container.querySelectorAll('button[name="show"]').forEach((elem) => 
            elem.addEventListener('mouseup', function(e) {
                e.stopPropagation();
                e.preventDefault();
                this.previousElementSibling.type = 'password';
            })
        );
        
        container.querySelectorAll('button[name="show"]').forEach((elem) => 
            elem.addEventListener('mouseout', function(e) {
                e.stopPropagation();
                e.preventDefault();
                this.previousElementSibling.type = 'password';
            })
        );
        
        // for (const el of container.querySelectorAll(".signup>.content>input[placeholder][data-slots]")) {
        //     const pattern = el.getAttribute("placeholder"),
        //         slots = new Set(el.dataset.slots || "_"),
        //         prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
        //         first = [ ...pattern ].findIndex(c => slots.has(c)),
        //         accept = new RegExp(el.dataset.accept || "\\d", "g"),
        //         clean = input => {
        //             input = input.match(accept) || [];
        //             return Array.from(pattern, c =>
        //                 input[ 0 ] === c || slots.has(c) ? input.shift() || c : c
        //             );
        //         },
        //         format = () => {
        //             const [ i, j ] = [ el.selectionStart, el.selectionEnd ].map(i => {
        //                 i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
        //                 return i<0? prev[ prev.length-1 ]: back? prev[ i-1 ] || first: i;
        //             });
        //             el.value = clean(el.value).join``;
        //             el.setSelectionRange(i, j);
        //             back = false;
        //         };
        //     let back = false;
        //     el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        //     el.addEventListener("input", format);
        //     el.addEventListener("focus", format);
        //     el.addEventListener("blur", () => el.value === pattern && (el.value=""));
        // }

        return [ root ];
    }
}
