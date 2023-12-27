import './edit.scss';

import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Carousel } from '../../../../components/carousel/Carousel';
import { ProductBase } from '../base';
import { BooleanInput, Button, FileInput, NumberInput, Select, Text, TextArea, TextInput } from '../../../../components/baseComponents/index';

import { FileApi } from '../../../../shared/api/file';
import { ProductApi } from '../../../../shared/api/product';
import { ResponseStatusChecker } from '../../../../shared/constants/response';

import Navigate from '../../../../shared/services/router/Navigate';

import CategoryStore from '../../../../shared/store/category';
import CityStore from '../../../../shared/store/city';

interface ProductBaseEditProps extends ProductModel {
    parent: ProductBase
}

interface ProductBaseEditState {
    [key: string]: any
}

interface ProductBaseEditImages {
    imagesForUpload?: Array<File>,
    uploadedImages?: Array<productImageUrl>,
}

export class ProductBaseEdit extends Component<ProductBaseEditProps, ProductBaseEditState> {
    state: ProductBaseEditState = {};

    images: ProductBaseEditImages = {
        imagesForUpload: [],
    };

    validate = () => {
        if (this.state.title?.trim() === '') {
            delete this.state.title;
        }

        if (this.state.description?.trim() === '') {
            delete this.state.description;
        }

        if (!this.state) {
            return false;
        }

        return true;
    };

    async uploadImages() {
        if (this.images.imagesForUpload) {
            const res = await FileApi.images(this.images.imagesForUpload);

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                // this.errorBox.innerHTML = '';

                if (ResponseStatusChecker.IsBadFormatRequest(res)) {
                    // this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
                    return;
                }
                else if (ResponseStatusChecker.IsInternalServerError(res)) {
                    // this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
                    return;
                }
                else if (ResponseStatusChecker.IsUserError(res)) {
                    // this.errorBox.append(ErrorMessageBox(res.body.error));
                    return;
                }

                return;
            }

            // this.state.
            this.state.images = res.body.urls.map((url: string) => {
                return {
                    url: url,
                };
            });
        }
    }

    fileInputEvent = (e: Event) => {
        const input = e.target as HTMLInputElement;

        if (!input.files) {
            return;
        }

        const files = Array.from(input.files);

        this.images.imagesForUpload = files;
    };

    formSubmit = async(e: Event) => {
        e.preventDefault();
        const productId = Number(new URLSearchParams(location.search).get('id'));

        const validation = this.validate();
        if (!validation) {
            return;
        }

        await this.uploadImages();

        const res = await ProductApi.patch(productId, {
            ...this.state,
        } as ProductModel);

        if (!ResponseStatusChecker.IsRedirectResponse(res)) {
            // this.errorBox.innerHTML = '';

            if (ResponseStatusChecker.IsBadFormatRequest(res)) {
                // this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(res)) {
                // this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
                return;
            }
            else if (ResponseStatusChecker.IsUserError(res)) {
                // this.errorBox.append(ErrorMessageBox(res.body.error));
                return;
            }

            return;
        }

        Navigate.navigateTo('/profile');
        Navigate.navigateTo(`/product?id=${res.body.id}`, { productId: res.body.id });
    };

    public render() {

        this.state['safe_deal'] = this.props.safe_deal;
        this.state['delivery'] = this.props.delivery;

        return createElement(
            'form',
            {
                class: 'edit-container',
                onsubmit: this.formSubmit,
            },
            createElement(
                'div',
                {
                    class: 'edit-container-body',
                    onsubmit: this.formSubmit,
                },
                createComponent(
                    Text,
                    {
                        text: 'Название',
                    },
                ),
                createComponent(
                    TextInput,
                    {
                        placeholder: this.props.title,
                        oninput: (e: Event) => this.state.title = (e.target as HTMLInputElement).value,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Изображения',
                    },
                ),
                createElement(
                    'div',
                    {},
                    createComponent(
                        Carousel,
                        {images: this.props.images},
                    ),
                    createComponent(
                        FileInput,
                        {
                            accept: '.png, .jpg, .jpeg',
                            multiple: true,
                            oninput: this.fileInputEvent,
                        },
                    ),
                ),
                createComponent(
                    Text,
                    {
                        text: 'Город',
                    },
                ),
                createComponent(
                    Select,
                    {
                        items: CityStore.getList(),
                        key: 'id',
                        value: 'name',
                        select: this.props.city_id?.toString(),
                        events: {
                            onchange: (e: Event) => this.state['city_id'] = Number((e.target as HTMLInputElement).value),
                        },
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Описание',
                    },
                ),
                createComponent(
                    TextArea,
                    {
                        placeholder: this.props.description,
                        oninput: (e: Event) => this.state.description = (e.target as HTMLInputElement).value,
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Категория',
                    },
                ),
                createComponent(
                    Select,
                    {
                        items: CategoryStore.getList(),
                        key: 'id',
                        value: 'name',
                        select: this.props.category_id?.toString(),
                        events: {
                            onchange: (e: Event) => this.state['category_id'] = Number((e.target as HTMLInputElement).value),
                        },
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Цена',
                    },
                ),
                createComponent(
                    NumberInput,
                    {
                        placeholder: this.props.price?.toString(),
                        oninput: (e: Event) => this.state.price = Number((e.target as HTMLInputElement).value),
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Доступное кол-во товара',
                    },
                ),
                createComponent(
                    NumberInput,
                    {
                        placeholder: this.props.available_count?.toString(),
                        oninput: (e: Event) => this.state['available_count'] = Number((e.target as HTMLInputElement).value),
                    },
                ),
                createComponent(
                    Text,
                    {
                        text: 'Безопасная сделка',
                    },
                ),
                createComponent(
                    BooleanInput,
                    {
                        checked: this.props.safe_deal,
                        oninput: (e: Event) => this.state['safe_deal'] = Boolean((e.target as HTMLInputElement).checked)},
                ),
                createComponent(
                    Text,
                    {
                        text: 'Доставка',
                    },
                ),
                createComponent(
                    BooleanInput,
                    {
                        checked: this.props.delivery,
                        oninput: (e: Event) => this.state.delivery = Boolean((e.target as HTMLInputElement).checked),
                    },
                ),
            ),
            createElement(
                'div',
                {
                    class: 'edit-container-btn-group',
                },
                createComponent(
                    Button,
                    {
                        text: 'Сохранить',
                        variant: 'primary',
                        style: 'width: 100%',
                    },
                ),
                createComponent(
                    Button,
                    {
                        text: 'Отмена',
                        variant: 'neutral',
                        subvariant: 'primary',
                        style: 'width: 100%',
                        onclick: this.props.parent.switchEditMode,
                    },
                ),
            ),
        );
    }
}
