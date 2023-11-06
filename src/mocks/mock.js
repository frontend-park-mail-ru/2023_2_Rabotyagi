import { createServer, Model, Response } from "miragejs";
import { generatePosts } from "./generators/posts";
import sign from "jwt-encode";
import jwtDecode from "../shared/utils/jwt-decode";
import { cookieParser } from "../shared/utils/cookie";
import { fakerRU } from "@faker-js/faker";

const createMockServer = function () {
    var usersCount = 1;
    var ordersCount = 1;

    const server = createServer({
        models: {
            users: Model,
            product: Model,
            orders: Model,
        },

    routes() {
        this.urlPrefix = 'http://localhost:8080';
        this.namespace = "api/v1";
    
        this.get("post/get_list", (schema) => schema.products.all().models);

        this.get("post/:id", (schema, request) => {
            const postId = request.params.id;
            const res = schema.products.findBy({ id: postId });
            if (res != null) {
                return new Response(200, {}, {
                    product: res,
                });
            } else {
                return new Response(222, {}, {
                    'error': 'Post with this id does not exist'
                });
            }
        });
    
        this.get("/signin", (schema, request) => {
            const res = schema.users.findBy({ email: request.queryParams.email });
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
                    id: usersCount,
                    email: body.email
                }
                
                schema.users.create(userData);
    
                const now = new Date();
                const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
                const access_token = sign(userData, 'xxx');
    
                document.cookie = `access_token=${access_token}; path=/; expires=${cookieExpiration.toUTCString()};`;
    
                usersCount += 1;
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

            if (product !== null) {
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
                return new Response(200, {}, {
                    order: orderData,
                });
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
                    return attrs.owner.id === user.id && attrs.status === 0;
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
                return attrs.owner.id === user.id && attrs.status === 0;
            });
            let data = [];
            res.forEach(({ attrs }) => data = [ ...data, attrs ]);

            return new Response(200, {}, {
                orders: data,
            });
        });

        this.delete('/orders/:id', (schema, request) => {
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

        this.get('/user/products', (schema, request) => {
            const token = cookieParser(document.cookie).access_token;
            if (token == undefined) {
                return new Response(401);
            }
            const user = jwtDecode(token);
            const res = schema.products.all().models.filter(({ attrs }) => attrs.saler.email === user.email);
            let data = [];
            res.forEach(({ attrs }) => data = [ ...data, attrs ]);

            return new Response(200, {}, {
                products: data
            })
        });
    },

    seeds(server) {
        const user = {
            id: usersCount,
            email: "NikDem@gmail.com",
            phone: "+7 999 999 66 66",
            name: "Никита",
            password: '363Nikita',
            birthday: Date.now()
        }
        server.create("user", user);
        usersCount += 1;

        // Проинициализировал модельки с постами, чтобы в in-memory db хранились, а не генерились постоянно
        generatePosts().forEach((product) => server.create("product", product));

        const saler = {
            email: "NikDem@gmail.com",
            phone: "+7 999 999 66 66",
            name: "Никита",
            image: '/images/' + Math.floor(Math.random() * (10 - 1) + 1) + '.jpg',
        };

        for (let index = 0; index < 10; index++) {
            server.create('product', {
                "id": index,
                "saler": user,
                "category": [
                    "Категория 1",
                    "Категория 2",
                    "Категория 3",
                ],
                "title": fakerRU.lorem.lines(1),
                "description": fakerRU.lorem.paragraph(),
                "price": fakerRU.finance.amount(500, 5000, 0),
                "created_at": Date.now(),
                "views": 0,
                "available_count": Math.floor(Math.random() * (100 - 1) + 1),
                "city": fakerRU.location.city(),
                "delivery": fakerRU.datatype.boolean(),
                "safe_deal": fakerRU.datatype.boolean(),
                "images": [
                    {
                        "url": '/images/' + Math.floor(Math.random() * (10 - 1) + 1) + '.jpg'
                    }
                ],
                "isActive": true
            })
        }
   },
 });

 return server;
};

export default createMockServer;