import { cookieParser } from '../../shared/utils/cookie';
import { setNewToken } from '../generators/token';

export const PROFILE = {
    get: (schema, request) => {
        const profileId = request.queryParams.id;
        const res = schema.users.findBy({ id: profileId });

        if (res == null) {
            return {
                status: 222,
                body: {
                    error: 'Такого пользователя нет',
                },
            };
        }
        const data = structuredClone(res.attrs);
        delete data.birthday, data.password;

        if (res != null) {
            return {
                body: data,
                status: 200,
            };
        } else {
            return {
                body: {
                    'error': 'Profile with this id does not exist',
                },
                status: 222,
            };
        }
    },

    update: {
        patch: (schema, request) => {
            const token = cookieParser(document.cookie).access_token;

            if (!token) {
                return {
                    body: {
                        error: 'Чел, ты не авторизован',
                    },
                    status: 401,
                };
            }
            const body = JSON.parse(request.requestBody);
            const user = schema.users.find(Number(body.id));

            delete body.id;

            user.update(body);
            const data = structuredClone(user.attrs);
            data.userID = data.id;
            delete data.password;
            delete data.birthday;
            delete data.id;
            setNewToken(data);

            return {
                status: 200,
            };
        },

        put: (schema, request) => {
            return PROFILE.update.patch(schema, request);
        },
    },
};
