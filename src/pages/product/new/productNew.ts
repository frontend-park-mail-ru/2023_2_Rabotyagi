import './productNew.scss';

import { FileInput, NumberInput, Text, TextArea, TextInput, BooleanInput, Button } from '../../../components/baseComponents/index';
import { Component } from '../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Select } from '../../../components/baseComponents/select/select';
import { FileApi } from '../../../shared/api/file';
import { ResponseStatusChecker } from '../../../shared/constants/response';
import { ProductApi } from '../../../shared/api/product';
import UserStore from '../../../shared/store/user';
import Navigate from '../../../shared/services/router/Navigate';
import CategoryStore from '../../../shared/store/category';
import CityStore from '../../../shared/store/city';

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
    uploadedImages?: Array<productImageUrl>
}

const initState: ProductNewState = {
    title: '',
    description: '',
    city: 1,
    category: 1,
    price: -1,
    availableCount: -1,
    safeDeal: false,
    delivery: false,
    imagesForUpload: [],
    uploadedImages: [],
};

export class ProductNew extends Component<never,ProductNewState> {
    state: ProductNewState = initState;

    validate = () => {
        if (this.state.title.trim() === '') {
            return 'Title must be not empty string';
        }

        if (this.state.description.trim() === '') {
            return 'Desc must be not empty string';
        }

        if (this.state.city === -1) {
            return 'City must be chosen';
        }

        if (this.state.category === -1) {
            return 'Category must be chosen';
        }

        if (this.state.price === -1) {
            return 'Price must be chosen';
        }

        if (this.state.availableCount === -1) {
            return 'available count must be chosen';
        }

        return null;
    };

    async uploadImages() {
        if (this.state.imagesForUpload) {
            const res = await FileApi.images(this.state.imagesForUpload);

            if (!ResponseStatusChecker.IsSuccessfulRequest(res)) {
                // this.errorBox.innerHTML = '';

                if (ResponseStatusChecker.IsBadFormatRequest(res)) {
                    // this.errorBox.append(ErrorMessageBox(statuses.USER_MESSAGE));
                    return false;
                }
                else if (ResponseStatusChecker.IsInternalServerError(res)) {
                    // this.errorBox.append(ErrorMessageBox(statuses.SERVER_MESSAGE));
                    return false;
                }
                else if (ResponseStatusChecker.IsUserError(res)) {
                    // this.errorBox.append(ErrorMessageBox(res.body.error));
                    return false;
                }

                return false;
            }

            this.state.uploadedImages = res.body.urls.map((respUrl: string) => {return {url: respUrl};});

            return true;
        }
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
            console.error(new Error(validation));

            return;
        }

        const successful = await this.uploadImages();

        if (!successful){
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

        Navigate.navigateTo(`/product?id=${res.body.id}`, { productId: res.body.id });

    };

    // clear() {
    //     this.setState(initState);
    //     this.children
    // }

    public render() {

        return createElement(
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
                        text: 'Выбрать файлики',
                        accept: '.png, .jpg, .jpeg',
                        multiple: true,
                        oninput: this.fileInputEvent,
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
        );
    }
}
