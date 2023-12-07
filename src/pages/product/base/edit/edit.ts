import { BooleanInput, Button, FileInput, NumberInput, Select, Text, TextArea, TextInput } from '../../../../components/baseComponents/index';
import { Component } from '../../../../components/baseComponents/snail/component';
import { createComponent, createElement } from '../../../../components/baseComponents/snail/vdom/VirtualDOM';
import { Carousel } from '../../../../components/carousel/Carousel';
import { Files } from '../../../../shared/api/file';
import { Product } from '../../../../shared/api/product';
import { ResponseStatusChecker } from '../../../../shared/constants/response';
import { ProductModel, productImageUrl } from '../../../../shared/models/product';
import Navigate from '../../../../shared/services/router/Navigate';
// import UserStore from '../../../../shared/store/UserStore';
import CategoryStore from '../../../../shared/store/category';
import CityStore from '../../../../shared/store/city';
import { Validate } from '../../../../shared/utils/validation';

interface ProductBaseEditProps extends ProductModel {}

interface ProductBaseEditState {
    // title?: string,
    // description?: string,
    // city?: number,
    // category?: number,
    // price?: number,
    // availableCount?: number,
    // safeDeal?: boolean,
    // delivery?: boolean,

    [key: string]: any
}

interface ProductBaseEditImages {
    imagesForUpload?: Array<File>,
    uploadedImages?: Array<productImageUrl>,
}

export class ProductBaseEdit extends Component<ProductBaseEditProps, ProductBaseEditState> {
    // state: ProductBaseEditState = {
    //     title: '',
    //     description: '',
    //     city: -1,
    //     category: -1,
    //     price: -1,
    //     availableCount: -1,
    //     safeDeal: false,
    //     delivery: false,
    // };
    state: ProductBaseEditState = {};

    images: ProductBaseEditImages = {
        imagesForUpload: [],
        uploadedImages: [],
    };

    validate = () => {
        if (this.state.title?.trim() === '') {
            delete this.state.title;
            // return 'Title must be not empty string';
        }

        if (this.state.description?.trim() === '') {
            delete this.state.description;
            // return 'Desc must be not empty string';
        }

        // if (this.state.city === -1) {
        //     return 'City must be chosen';
        // }

        // if (this.state.category === -1) {
        //     return 'Category must be chosen';
        // }

        // if (this.state.price === -1) {
        //     return 'Price must be chosen';
        // }

        // if (this.state.availableCount === -1) {
        //     return 'available count must be chosen';
        // }

        if (!this.state) {
            return false;
        }

        return true;
    };

    async uploadImages() {
        if (this.state.imagesForUpload) {
            const res = await Files.images(this.state.imagesForUpload);

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

            this.state.uploadedImages = res.body.urls;
        }
    }

    fileInputEvent = (e: Event) => {
        const input = e.target as HTMLInputElement;

        const allowedFormats = input.accept;
        if (!input.files) {
            return;
        }

        const files = Array.from(input.files);

        const validation = Validate.allowedFormats(allowedFormats, files);

        if (validation) {
            return;
        }

        this.state.imagesForUpload = files;
    };

    formSubmit = async(e: Event) => {
        e.preventDefault();
        const productId = Number(new URLSearchParams(location.search).get('id'));

        const validation = this.validate();
        if (!validation) {
            return;
        }

        const res = await Product.patch(productId, {
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

        Navigate.navigateTo(`/product?id=${res.body.id}`, { productId: res.body.id });

    };

    public render() {
        if (!this.props){
            throw new Error('ProductBaseEdit props undefined');
        }

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
                        oninput: (e: Event) => this.state['safe_deal'] = Boolean((e.target as HTMLInputElement).value),
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
                        checked: this.props.delivery,
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
                        text: 'Сохранить',
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
