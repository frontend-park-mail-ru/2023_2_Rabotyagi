import { createServer, Model, Response } from "miragejs";
import { generatePost } from "./generators/posts";
import sign from "jwt-encode";
import jwtDecode from "../shared/utils/jwt-decode";
import { cookieParser } from "../shared/utils/cookie";
import { generateUser } from "./generators/users";

const createMockServer = function () {
    const server = createServer({
        models: {
            users: Model,
            product: Model,
            orders: Model,
            favourite: Model,
        },

    routes() {
        this.urlPrefix = 'http://localhost:8080';
        this.namespace = "api/v1";
    
        this.get("product/get_list", (schema) => schema.products.all().models);

        this.get('product', (schema, request) => {
            const res = schema.products.findBy({ id: request.queryParams.id });

            if (res == null) {
                return new Response(222, {}, {
                    'error': 'Такого объявления не существует'
                })
            }
            const model = res.attrs;
            model.saler = schema.users.find(model.salerId).attrs;
            delete model.salerId;
            return new Response(200, {}, model);
        });
    
        this.get("/signin", (schema, request) => {
            const res = schema.users.findBy({ email: request.queryParams.email });
            console.log(res);
            if ((res == null) || (res.attrs.password != request.queryParams.password)) {
                return new Response(222, {}, {
                    'error': 'Неверная почта или пароль'
                })
            }
            else {
                const now = new Date();
                const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
                const access_token = sign(res.attrs, 'xxx');
    
                document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;
                return new Response(200);
            }
        });
    
        this.post('/signup', (schema, request) => {
            const body = JSON.parse(request.requestBody);
            const res = schema.users.findBy({ email: body.email });
    
            if (res == null) {
                const userData = {
                    email: body.email,
                    password: body.password
                }
                
                schema.users.create(userData);
    
                const now = new Date();
                const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
                const access_token = sign(userData, 'xxx');
    
                document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;
    
                return new Response(200);
            }
            else {
                return new Response(222, {}, {
                    'error': 'User already exists'
                })
            }
        });

        this.post('/order/add', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const user = jwtDecode(token);
            const body = JSON.parse(request.requestBody);
            const product = schema.products.findBy({ id: body.product_id });
            const order = schema.orders.findBy({ product_id: body.product_id, owner_id: user.id, status: 0 });

            if (product !== null && order === null) {
                const orderData = {
                    "id": ordersCount,
                    "owner_id": user.id,
                    "count": body.count,
                    "status": 0,
                    "product_id": body.product_id,
                    "city": product.city,
                    "delivery": product.delivery,
                    "in_favourites": product.in_favourites,
                    "available_count": product.available_count,
                    "price": product.price,
                    "safe_deal": product.safe_deal,
                    "title": product.title,
                    "images": product.images,
                };        
                ordersCount += 1;
                schema.orders.create(orderData);
                return new Response(200, {}, orderData);
            }
            else {
                return new Response(222, {}, {
                    'error': 'Order already exists'
                })
            }
        });

        this.patch('/order/buy_full_basket', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const user = jwtDecode(token);

            try {
                const res = schema.orders.all().models.filter(({ attrs }) => {
                    return attrs.owner_id === Number(user.id) && attrs.status === 0;
                });            

                res.forEach(({ attrs }) => {
                    schema.orders.findBy({ id: attrs.id }).update({ status: 1 });
                });

                return new Response(200, {}, {
                    'message': 'OK'
                });
            } catch(err) {
                return new Response(222, {}, {
                    'error': err
                });
            }
        });

        this.get('/order/get_basket', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const user = jwtDecode(token);
            
            const res = schema.orders.all().models.filter(({ attrs }) => {
                return attrs.owner_id === Number(user.id) && attrs.status === 0;
            });
            let data = [];
            res.forEach(({ attrs }) => data = [ ...data, attrs ]);

            return new Response(200, {}, data);
        });

        this.patch('/order/update_count', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const body = JSON.parse(request.requestBody);

            try {
                schema.orders.findBy({ id: body.id }).update({
                    count: body.count,
                });
                return new Response(200, {}, {
                    'message': 'Successful update count',
                });
            } catch (err) {
                return new Response(222, {}, {
                    'error': 'Something went wrong when updating status'
                });
            }   
        });

        this.patch('/order/update_status', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            
            const body = JSON.parse(request.requestBody);

            try {
                schema.orders.findBy({ id: body.id }).update({
                    status: body.status,
                });
                return new Response(200, {}, {
                    'message': 'Successful update status',
                });
            } catch (err) {
                return new Response(222, {}, {
                    'error': 'Something went wrong when updating status'
                });
            }   
        });

        this.patch('/user', (schema, request) => {
            const curUser = jwtDecode(token);
            const dbUser = schema.users.find(curUser.id);

            if (dbUser == null) {
                return new Response(222, {}, {
                    error: 'Пользователь не найден'
                });
            }

            dbUser.update(body);

            const now = new Date();
            const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
            const access_token = sign(dbUser.attrs, 'xxx');

            document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;

            return new Response(200);
        });

        this.delete('/order/delete/:id', (schema, request) => {
            const id = request.params.id;

            try {
                schema.orders.find(id).destroy();
                return new Response(200, {}, {
                    'message': 'Successful deletion',
                });
            } catch (err) {
                return new Response(222, {}, {
                    'error': 'Something went wrong when deleting'
                });
            }   
        });

        this.get('/user/products', (schema) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const user = jwtDecode(token);
            const res = schema.products.all().models.filter(({ attrs }) => attrs.salerId === user.id);
            let data = [];
            res.forEach(({ attrs }) => data = [ ...data, attrs ]);

            return new Response(200, {}, data);
        });

        this.get('/user/orders', () => {
            return new Response(200);
        });

        this.get('/user/favourites', (schema) => {
            const user = jwtDecode(cookieParser(document.cookie).access_token);

            const favs = schema.favourites.where({ userId: user.id }).models;
            let data = [];

            favs.forEach(({ attrs }) => {
                const product = schema.products.find(attrs.productId);
                data = [ ...data, product.attrs ];
            });
            return new Response(200, {}, data);
        })

        this.get('/user/add-to-fav', (schema, request) => {
            const product = schema.products.find(request.queryParams.id);
            const fav = schema.favourites.findBy({ productId: product.id });

            if (fav == null) {
                const user = jwtDecode(cookieParser(document.cookie).access_token);
                const fav = schema.create('favourite', {
                    productId: product.id,
                    userId: user.id
                })
                console.log(fav);
                return new Response(200);
            }

            fav.destroy();
            return new Response(200);

        });

        this.get('/profile/get/:id', (schema, request) => {
            const profileId = request.params.id;
            const res = schema.users.findBy({ id: profileId });
            if (res != null) {
                return new Response(200, {}, {
                    "birthday": res.birthday,
                    "email": res.email,
                    "id": res.id,
                    "name": res.name,
                    "phone": res.phone
                });
            } else {
                return new Response(222, {}, {
                    'error': 'Profile with this id does not exist'
                });
            } 
        });
    },

    // Проинициализировал модельки с постами, чтобы в in-memory db хранились, а не генерились постоянно
    seeds(server) {
        let user;
        
        for (let index = 0; index < 10; index++) {
            user = server.create('user', generateUser());
            
            for (let index = 0; index < 5; index++) {
                server.create("product", generatePost(user.id));            
            }
        }

        user = server.create("user", {
            email: "owner@gmail.com",
            phone: "+7 999 999 66 66",
            name: "root",
            password: 'root',
            birthday: Date.now()
        });

        for (let index = 0; index < 5; index++) {
            server.create("product", generatePost(user.id));            
        }
   },
 });

 return server;
};

export default createMockServer;