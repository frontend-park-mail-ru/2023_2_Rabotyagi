import './productNew.scss';

import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement, createText } from '../../../components/baseComponents/snail/vdom/VirtualDOM';

import { Select } from '../../../components/baseComponents/select/select';
import { FileInput, NumberInput, Text, TextArea, TextInput, BooleanInput, Button, ErrorMessageBox } from '../../../components/baseComponents/index';

import { FileApi } from '../../../shared/api/file';
import { ProductApi } from '../../../shared/api/product';
import { ResponseStatusChecker, ResponseMessage } from '../../../shared/constants/response';

import UserStore from '../../../shared/store/user';
import CategoryStore from '../../../shared/store/category';
import CityStore from '../../../shared/store/city';

import Navigate from '../../../shared/services/router/Navigate';

interface ProductNewState {
    title: string,
    description: string,
    city: number,
    category: number,
    price: number,
    availableCount: number,
    safeDeal: boolean,
    delivery: boolean,
    imagesForUpload?: Array<File>,
    uploadedImages?: Array<productImageUrl>,
    error: string,
}

const initState: ProductNewState = {
    title: '',
    description: '',
    city: -1,
    category: -1,
    price: -1,
    availableCount: -1,
    safeDeal: false,
    delivery: false,
    imagesForUpload: [],
    uploadedImages: [],
    error: '',
};

export class ProductNew extends Component<never,ProductNewState> {
    state: ProductNewState = initState;

    validate = () => {
        if (this.state.title.trim() === '') {
            return 'Название не должно быть пустым';
        }

        if (this.state.description.trim() === '') {
            return 'Описание не должно быть пустым';
        }

        return null;
    };

    async uploadImages() {
        if (this.state.imagesForUpload && this.state.imagesForUpload.length > 0) {
            const res = await FileApi.images(this.state.imagesForUpload);

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {

                if (ResponseStatusChecker.IsBadFormatRequest(res)) {
                    this.setState({
                        ...this.state,
                        error: ResponseMessage.USER_MESSAGE,
                    });

                    return false;
                }
                else if (ResponseStatusChecker.IsInternalServerError(res)) {
                    this.setState({
                        ...this.state,
                        error: ResponseMessage.SERVER_MESSAGE,
                    });

                    return false;
                }
                else if (ResponseStatusChecker.IsUserError(res)) {
                    this.setState({
                        ...this.state,
                        error: res.body.error,
                    });

                    return false;
                }

                return false;
            }

            this.state.uploadedImages = res.body.urls.map((respUrl: string) => {return {url: respUrl};});

            return true;
        }

        return true;
    }

    fileInputEvent = (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (!input.files) {
            return;
        }
        const files = Array.from(input.files);

        this.state.imagesForUpload = files;
    };

    formSubmit = async(e: Event) => {
        e.preventDefault();

        const validation = this.validate();
        if (validation) {
            this.setState({
                ...this.state,
                error: validation,
            });

            return;
        }

        if (this.state.category === -1) {
            this.state.category = CategoryStore.getFirst();
        }

        if (this.state.city === -1) {
            this.state.city = CityStore.getFirst();
        }

        const successful = await this.uploadImages();

        if (!successful){
            this.setState({
                ...this.state,
                error: 'Ошибка при загрузке файлов',
            });

            return;
        }

        const res = await ProductApi.create({
            'title': this.state.title,
            'description': this.state.description,
            'available_count': this.state.availableCount,
            'category_id': this.state.category,
            'city_id': this.state.city,
            'delivery': this.state.delivery,
            'is_active': false,
            'price': this.state.price,
            'safe_deal': this.state.safeDeal,
            'saler_id': UserStore.getFields()?.id,
            'images': this.state.uploadedImages,
        } as ProductModelPut);

        if (!ResponseStatusChecker.IsRedirectResponse(res)) {

            if (ResponseStatusChecker.IsBadFormatRequest(res)) {
                this.setState({
                    ...this.state,
                    error: ResponseMessage.USER_MESSAGE,
                });

                return;
            }
            else if (ResponseStatusChecker.IsInternalServerError(res)) {
                this.setState({
                    ...this.state,
                    error: ResponseMessage.SERVER_MESSAGE,
                });

                return;
            }
            else if (ResponseStatusChecker.IsUserError(res)) {
                this.setState({
                    ...this.state,
                    error: res.body.error,
                });

                return;
            }

            return;
        }

        Navigate.navigateTo(`/product?id=${res.body.id}`, { productId: res.body.id });

    };

    public render() {
        return createElement(
            'div',
            { class: 'wrapper-product-new' },
            createElement(
                'form',
                {
                    class: 'content-add',
                    onsubmit: this.formSubmit,
                },
                createElement(
                    'div',
                    {
                        class: 'content-add-body',
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
                            oninput: (e: Event) => this.state.title = (e.target as HTMLInputElement).value,
                            required: true,
                        },
                    ),
                    createComponent(
                        Text,
                        {
                            text: 'Изображения',
                        },
                    ),
                    createComponent(
                        FileInput,
                        {
                            text: 'Выбрать файлы',
                            accept: '.png, .jpg, .jpeg',
                            multiple: true,
                            oninput: this.fileInputEvent,
                            required: true,
                        },
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
                            events: {
                                onchange: (e: Event) => this.state.city = Number((e.target as HTMLInputElement).value),
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
                            oninput: (e: Event) => this.state.description = (e.target as HTMLInputElement).value,
                            required: true,
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
                            events: {
                                onchange: (e: Event) => this.state.category = Number((e.target as HTMLInputElement).value),
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
                            oninput: (e: Event) => this.state.price = Number((e.target as HTMLInputElement).value),
                            required: true,
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
                            oninput: (e: Event) => this.state.availableCount = Number((e.target as HTMLInputElement).value),
                            required: true,
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
                            oninput: (e: Event) => this.state.safeDeal = Boolean((e.target as HTMLInputElement).value),
                        },
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
                            oninput: (e: Event) => this.state.delivery = Boolean((e.target as HTMLInputElement).value),
                        },
                    ),
                ),
                (this.state.error !== '') ?
                    createElement(
                        'div',
                        {
                            class: 'content-add-error',
                        },
                        createComponent(
                            ErrorMessageBox,
                            { text: this.state.error },
                        ),
                    ) :
                    createText(''),
                createElement(
                    'div',
                    {
                        class: 'content-add-btn-group',
                    },
                    createComponent(
                        Button,
                        {
                            text: 'Создать',
                            variant: 'primary',
                            style: 'width: 100%',
                        },
                    ),
                    // createComponent(
                    //     Button,
                    //     {
                    //         text: 'Очистить',
                    //         variant: 'neutral',
                    //         subvariant: 'primary',
                    //         style: 'width: 100%',
                    //         onclick: this.clear,
                    //     },
                    // ),
                ),
            ),
        );
    }
}
