import { rest } from 'msw';

const BASE_URL = 'http://localhost:8080';

export const handlers =[
    rest.post(BASE_URL + '/api/v1/signin', (req, res, ctx) => {
        console.log('request', req);
        console.log('response', res);
        console.log('ctx', ctx);

        return res(
            ctx.json([ { ok: true } ])
        );
    }),
    rest.post(BASE_URL + '/api/v1/signup', (req, res, ctx) => {
        console.log('request', req);
        console.log('response', res);
        console.log('ctx', ctx);

        return res(
            ctx.status(200),
        );
    }),
    rest.get(BASE_URL + '/api/v1/post/get_list', (req, res, ctx) => {
        console.log('request', req);
        console.log('response', res);
        console.log('ctx', ctx);

        return res(
            ctx.json([ { ok: true } ])
        );
    })
]