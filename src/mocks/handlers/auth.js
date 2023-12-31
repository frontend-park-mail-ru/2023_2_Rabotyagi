import sign from 'jwt-encode';

export const AUTH = {
    signin: (schema, request) => {
        const res = schema.users.findBy({ email: request.queryParams.email });
        if (res == null) {
            return {
                body: {
                    'error': 'Неправильная почта или пароль',
                },
                status: 222,
            };
        }

        if (res.attrs.password != request.queryParams.password){
            return {
                body: {
                    'error': 'Неправильная почта или пароль',
                },
                status: 222,
            };
        }

        const data = structuredClone(res.attrs);
        data.userID = structuredClone(data.id);
        delete data.password;

        const now = new Date();
        const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
        const accessToken = sign(data, 'xxx');

        document.cookie = `access_token=${accessToken}; path=/; expires=${cookieExpiration.toUTCString()};`;

        return {
            body: null,
            status: 200,
        };
    },

    signup: (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const res = schema.users.findBy({ email: body.email });

        if (res == null) {
            let data = body;

            data = structuredClone(schema.users.create(data).attrs);
            data.userID = structuredClone(data.id);
            delete data.password;

            const now = new Date();
            const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
            const accessToken = sign(data, 'xxx');

            document.cookie = `access_token=${accessToken}; path=/; expires=${cookieExpiration.toUTCString()};`;

            return {
                body: null,
                status: 200,
            };
        }
        else {
            return {
                body: {
                    'error': 'User already exists',
                },
                status: 222,
            };
        }
    },
};
