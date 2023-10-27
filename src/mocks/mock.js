import { createServer, Model, Response } from "miragejs";
import { generatePosts } from "./generators/posts";
import sign from "jwt-encode";

const createMockServer = function () {
    var usersCount = 1;

    const server = createServer({
        models: {
            users: Model,
        },

    routes() {
        this.urlPrefix = 'http://localhost:8080';
        this.namespace = "api/v1";
    
        this.get("post/get_list", () => {
            return generatePosts();
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
    },

    seeds(server) {
        server.create("user", {
            id: usersCount,
            email: "NikDem@gmail.com",
            phone: "+7 999 999 66 66",
            name: "Никита",
            password: '363Nikita',
            birthday: Date.now()
        });
        usersCount += 1;
   },
 });

 return server;
};

export default createMockServer;