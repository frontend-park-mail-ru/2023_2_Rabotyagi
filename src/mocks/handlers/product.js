import { cookieParser } from '../../shared/utils/cookie';
import jwtDecode from '../../shared/utils/jwt-decode';

export const PRODUCT = {
    add: (schema, request) => {
        const token = cookieParser(document.cookie).access_token;
        if (!token) {
            return {
                status: 401,
            };
        }

        const body = JSON.parse(request.requestBody);
        body.images = [];
        const product = schema.products.create(body);

        return {
            status: 200,
            body: {
                id: product.id,
            },
        };
    },

    delete: (schema, request) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401,
            };
        }
        const user = jwtDecode(token);
        const product = schema.products.find(
            Number(request.queryParams.id),
        );

        if (product.saler_id !== user.id) {
            return {
                status: 400,
            };
        }

        product.destroy();

        return {
            status: 200,
        };
    },

    get: (schema, request) => {
        const res = schema.products.findBy({ id: request.queryParams.id });

        if (res == null) {
            return new Response(222, {}, {
                'error': 'Такого объявления не существует',
            });
        }

        return {
            body: res,
            status: 200,
        };
    },

    getList: (schema) => {
        return {
            body: schema.products.all().models,
            status: 200,
        };
    },

    getListOfSaler: (schema) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401,
            };
        }
        const user = jwtDecode(token);
        const res = schema.products.all().models.filter(({ attrs }) => attrs.saler_id === user.id);
        let data = [];
        res.forEach(({ attrs }) => data = [ ...data, attrs ]);

        return {
            status: 200,
            body: data,
        };
    },

    update: {
        patch: (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return {
                    status: 401,
                };
            }

            const body = JSON.parse(request.requestBody);
            delete body.id;
            const product = schema.products.find(
                Number(request.queryParams.id),
            );

            product.update(body);

            return {
                status: 303,
                body: null,
            };

        },

        put: (schema, request) => {
            return PRODUCT.update.patch(schema, request);
        },
    },

};
