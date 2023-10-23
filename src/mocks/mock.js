import { createServer, Model, Response } from "miragejs";
import { generatePosts } from "./generators/posts";
import sign from "jwt-encode";

const createMockServer = function () {
    var usersCount = 1;

    let server = createServer({
        models: {
            users: Model,
        },

        routes() {
            this.urlPrefix = 'http://localhost:8080';
            this.namespace = "api/v1";
        
            this.get("post/get_list", (schema, request) => {
                return generatePosts();
            });
        
            this.get("/signin", (schema, request) => {
                const res = schema.users.findBy({email: request.queryParams.email});
                if (res == null) {
                    return new Response(222, {}, {
                        'error': 'User not found'
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
                const res = schema.users.findBy({email: body.email});
        
                if (res == null) {
                    console.log(usersCount);
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

//    seeds(server) {
//     //  server.create("todo", {
//     //    id: 1,
//     //    title: "Reach out to a friend",
//     //    completed: true,
//     //  });

//     //  server.create("todo", {
//     //    id: 2,
//     //    title: "Make breakfast",
//     //    completed: true,
//     //  });

//     //  server.create("todo", {
//     //    id: 3,
//     //    title: "Text John Doe",
//     //    completed: false,
//     //  });
//    },

   },
 });

 return server;
};

export default createMockServer;