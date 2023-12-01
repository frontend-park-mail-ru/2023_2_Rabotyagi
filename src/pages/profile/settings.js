import template from './templates/settings.hbs';
import './styles/settings.scss';

import { store } from '../../shared/store/store';

import { ErrorMessageBox } from '../../components/error/errorMessageBox';
import button from '../../components/button/button';

import { User } from '../../shared/api/user';
import { Files } from '../../shared/api/file';
import statuses from '../../shared/statuses/statuses';

import { stringToElement } from '../../shared/utils/parsing';
import { cookieParser } from '../../shared/utils/cookie';
import Validate from '../../shared/utils/validation';

class Settings {
    async patchProfile(data, errorBox) {
        const res = await User.patchProfile(data);

        if (!statuses.IsSuccessfulRequest(res)) {
            if (statuses.IsBadFormatRequest(res)) {
                errorBox.replaceWith(ErrorMessageBox(statuses.USER_MESSAGE, 'errorBox'));
            }
            else if (statuses.IsInternalServerError(res)) {
                errorBox.replaceWith(ErrorMessageBox(statuses.SERVER_MESSAGE, 'errorBox'));
            }
            else if (statuses.IsUserError(res)) {
                errorBox.replaceWith(ErrorMessageBox(res.body.message, 'errorBox'));
            }

            return;
        }

        await store.user.login(
            cookieParser(document.cookie).access_token,
        );
    }

    async uploadAvatar() {
        if (this.avatarForUpload) {
            const res = await Files.images(this.avatarForUpload);

            if (!statuses.IsSuccessfulRequest(res)) {
                this.errorBox.innerHTML = '';

                if (statuses.IsBadFormatRequest(res)) {
                    this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
                }
                else if (statuses.IsInternalServerError(res)) {
                    this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
                }
                else if (statuses.IsUserError(res)) {
                    this.errorBox.append(ErrorMessageBox(res.body.error));
                }
            }

            this.uploadedAvatar = res.body.urls[ 0 ];
        }
    }

    async preRender() {
        this.root = stringToElement(template(store.user.state.fields));

        const inputs = this.root.querySelectorAll('.content input');
        const inputAvatar = this.root.querySelector('.content input[name="avatar"]');
        const form = this.root.querySelector('.content');
        this.errorBox = this.root.querySelector('#errorBox');

        inputAvatar.addEventListener('change', async(e) => {
            e.stopPropagation();

            this.errorBox.innerHTML = '';
            const files = Array.from(inputAvatar.files);
            const validation = Validate.allowedFormats(inputAvatar.accept, files);

            if (validation) {
                this.errorBox.appendChild(ErrorMessageBox(`Формат ${validation} недопустим`));
            }
            else {
                this.avatarForUpload = files[ 0 ];
            }

        });

        const dataSlots = form.querySelectorAll('input[placeholder][data-slots]');

        for (const el of dataSlots) {
            const pattern = el.getAttribute('placeholder'),
                slots = new Set(el.dataset.slots || '_'), // eslint-disable-line no-undef
                prev = (end => Array.from(pattern, (index, start) => slots.has(index)? end=start+1: end))(0),
                first = [ ...pattern ].findIndex(index => slots.has(index)),
                accept = new RegExp(el.dataset.accept || '\\d', 'g'),
                clean = input => {
                    input = input.match(accept) || [];

                    return Array.from(pattern, c =>
                        input[ 0 ] === c || slots.has(c) ? input.shift() || c : c,
                    );
                },
                format = () => {
                    const [ start, end ] = [ el.selectionStart, el.selectionEnd ].map(start => {
                        start = clean(el.value.slice(0, start)).findIndex(index => slots.has(index));

                        return start<0? prev[ prev.length-1 ]: back? prev[ start-1 ] || first: start;
                    });
                    el.value = clean(el.value).join``;
                    el.setSelectionRange(start, end);
                    back = false;
                };
            let back = false;
            el.addEventListener('keydown', (e) => back = e.key === 'Backspace');
            el.addEventListener('input', format);
            el.addEventListener('focus', format);
            el.addEventListener('blur', () => {
                if (el.value === pattern){
                    el.value='';
                }
            });
        }

        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const { elements } = form;

            const data = Array.from(elements)
            .filter((item) => !!item.name && !!item.value)
            .reduce((result, element) => {
                const { name, value } = element;
                result[name] = value;

                return result;
            }, {});

            data.id = store.user.state.fields.id;

            await this.uploadAvatar();

            if (this.uploadedAvatar) {
                data.avatar = this.uploadedAvatar;
            }

            const res = await User.patchProfile(data);

            const errorBox = this.root.querySelector('#errorBox');
            if (!statuses.IsSuccessfulRequest(res)) {
                if (statuses.IsBadFormatRequest(res)) {
                    errorBox.replaceWith(ErrorMessageBox(statuses.USER_MESSAGE, 'errorBox'));
                }
                else if (statuses.IsInternalServerError(res)) {
                    errorBox.replaceWith(ErrorMessageBox(statuses.SERVER_MESSAGE, 'errorBox'));
                }
                else if (statuses.IsUserError(res)) {
                    errorBox.replaceWith(ErrorMessageBox(res.body.error, 'errorBox'));
                }

                return;
            }

            await store.user.login(
                cookieParser(document.cookie),
            );
            window.Router.navigateTo('/profile/settings');
        });

        this.root.querySelector('#btn-submit').replaceWith(button({
            id: 'btn-submit',
            variant: 'primary',
            text: {
                class: 'text-regular',
                content: 'Сохранить',
            },
            type: 'submit',
        }));

        this.root.querySelector('#btn-cancel').replaceWith(button({
            id: 'btn-cancel',
            variant: 'outlined',
            text: {
                class: 'text-regular',
                content: 'Отменить',
            },
        }));

        this.root.querySelector('#btn-cancel').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            inputs?.forEach((elem) => {
                elem.value = '';
            });
        });
    }

    render() {
        this.preRender();

        return [ this.root ];
    }
}

export default Settings;
