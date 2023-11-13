import sign from "jwt-encode";

export const AUTH = {
    signin: (schema, request) => {
        const res = schema.users.findBy({ email: request.queryParams.email });

        if ((res == null) || (res.attrs.password != request.queryParams.password)) {
            return {
                body: {
                    'error': 'Неверная почта или пароль'
                },
                status: 222
            } 
        }
        else {
            const data = structuredClone(res.attrs);
            data.userID = structuredClone(data.id);
            delete data.password;

            const now = new Date();
            const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
            const access_token = sign(data, 'xxx');

            document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;

            return {
                body: null,
                status: 200
            };
        }
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
            const access_token = sign(data, 'xxx');

            document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;

            return {
                body: null,
                status: 200
            };
        }
        else {
            return {
                body: {
                    'error': 'User already exists'
                },
                status: 222
            }
        }
    },
}