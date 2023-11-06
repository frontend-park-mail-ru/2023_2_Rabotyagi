import { createServer, Model, Response } from "miragejs";
import { generatePost } from "./generators/posts";
import sign from "jwt-encode";
import jwtDecode from "../shared/utils/jwt-decode";
import { cookieParser } from "../shared/utils/cookie";

const createMockServer = function () {
    var usersCount = 1;

    const server = createServer({
        models: {
            users: Model,
            product: Model,
        },

    routes() {
        this.urlPrefix = 'http://localhost:8080';
        this.namespace = "api/v1";
    
        this.get("post/get_list", (schema) => schema.products.all().models);

        this.get('post', (schema, request) => {
            const res = schema.products.findBy({ id: request.queryParams.id });

            if (res == null) {
                return new Response(222, {}, {
                    'error': 'Такого объявления не существует'
                })
            }

            return new Response(200, {}, res.attrs);
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

        this.get('/user/products', (schema) => {
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

        this.get('/user/orders', () => {
            return new Response(200);
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
        let postCount = 0;
        for (; postCount < 20; postCount++) {
            server.create("product", generatePost(postCount));            
        }
        // generatePosts().forEach((product) => server.create("product", product));


        for (; postCount < 30; postCount++) {
            const post = generatePost(postCount);
            post.saler = user;
            server.create('product', post);
        }
   },
 });

 return server;
};

export default createMockServer;