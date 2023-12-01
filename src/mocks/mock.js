import { createServer, Model, Response } from 'miragejs';
import { generatePost } from './generators/posts';
import jwtDecode from '../shared/utils/jwt-decode';
import { cookieParser } from '../shared/utils/cookie';
import { generateUser } from './generators/users';
import { fakerRU } from '@faker-js/faker';
import { AUTH } from './handlers/auth';
import { PRODUCT } from './handlers/product';
import { PROFILE } from './handlers/profile';
import { CATEGORY } from './handlers/category';
import { ORDER } from './handlers/order';

const createMockServer = function() {
    const server = createServer({
        models: {
            users: Model,
            product: Model,
            orders: Model,
            favourite: Model,
            category: Model,
        },

    routes() {
        this.urlPrefix = 'http://localhost:8080';
        this.namespace = 'api/v1';

        //#region Category
        this.get('category/get_full', CATEGORY.getFull);
        //#endregion

        //#region Product
        this.get('product/get_list', PRODUCT.getList);
        this.get('product/get', PRODUCT.get);
        this.get('product/get_list_of_saler', PRODUCT.getListOfSaler);
        this.post('product/add', PRODUCT.add);
        this.put('product/update', PRODUCT.update.put);
        this.patch('product/update', PRODUCT.update.patch);
        this.delete('product/delete', PRODUCT.delete);
        //#endregion

        //#region Auth
        this.get('signin', AUTH.signin);
        this.post('signup', AUTH.signup);
        //#endregion

        //#region Order
        this.get('order/get_basket', ORDER.getBasket);
        this.post('order/add', ORDER.add);
        this.delete('order/delete', ORDER.delete);
        this.patch('order/buy_full_basket', ORDER.buyFullBasket);
        this.patch('order/update_count', ORDER.updateCount);
        this.patch('order/update_status', ORDER.updateStatus);
        //#endregion

        //#region Profile
        this.get('profile/get', PROFILE.get);
        this.put('profile/update', PROFILE.update.put);
        this.patch('profile/update', PROFILE.update.patch);
        //#endregion

        //#region Legacy
        // this.get('/user/products', (schema) => );

        this.get('profile/orders', () => {
            return new Response(200);
        });

        this.get('profile/favourites', (schema) => {
            const user = jwtDecode(cookieParser(document.cookie).access_token);

            const favs = schema.favourites.where({ userId: user.id }).models;
            let data = [];

            favs.forEach(({ attrs }) => {
                const product = schema.products.find(attrs.productId);
                data = [ ...data, product.attrs ];
            });

            return new Response(200, {}, data);
        });

        this.post('product/add-to-fav', (schema, request) => {
            const product = schema.products.find(request.queryParams.id);
            const fav = schema.favourites.findBy({ productId: product.id });

            if (fav == null) {
                const user = jwtDecode(cookieParser(document.cookie).access_token);
                schema.create('favourite', {
                    productId: product.id,
                    userId: user.id,
                });

                return new Response(200);
            }

            fav.destroy();

            return new Response(200);

        });
        //#endregion
    },

    // Проинициализировал модельки с постами, чтобы в in-memory db хранились, а не генерились постоянно
    seeds(server) {
        let user;

        user = server.create('user', {
            email: 'owner@gmail.com',
            phone: '+7 999 999 66 66',
            name: 'root',
            password: 'root',
            birthday: Date.now(),
            avatar: {
                String: '',
                Valid: false,
            },
        });

        for (let index = 0; index < 5; index++) {
            server.create('product', generatePost(user.id));
        }

        for (let index = 0; index < 10; index++) {
            user = server.create('user', generateUser());

            for (let index = 0; index < 5; index++) {
                server.create('product', generatePost(user.id));
            }
        }

        server.create('category', {
            name: fakerRU.hacker.noun(),
            'parent_id': null,
        });

   },
 });

 return server;
};

export default createMockServer;
