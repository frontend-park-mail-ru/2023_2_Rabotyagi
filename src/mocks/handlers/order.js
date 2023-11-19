import { cookieParser } from "../../shared/utils/cookie";
import jwtDecode from "../../shared/utils/jwt-decode";

export const ORDER = {
    add: (schema, request) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401
            };
        }
        const user = jwtDecode(token);
        const body = JSON.parse(request.requestBody);
        const product = schema.products.findBy({ id: body.product_id });
        const order = schema.orders.findBy({ product_id: body.product_id, owner_id: user.id, status: 0 });

        if (product !== null && order === null) {
            const orderData = {
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
            const orderBody = schema.orders.create(orderData);
            return {
                body: orderBody,
                status: 200
            };
        }
        else {
            return {
                body: {
                    error: 'Order already exists'
                },
                status: 222
            }
        }
    },

    buyFullBasket: (schema) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401
            };
        }
        const user = jwtDecode(token);

        try {
            const res = schema.orders.all().models.filter(({ attrs }) => {
                return attrs.owner_id === Number(user.id) && attrs.status === 0;
            });            

            res.forEach(({ attrs }) => {
                schema.orders.findBy({ id: attrs.id }).update({ status: 1 });
            });

            return {
                status: 200,
                body: {
                    message: 'OK',
                }
            };
        } catch(err) {
            return {
                status: 222,
                body: {
                    error: err
                }
            };
        }
    },
    
    delete: (schema, request) => {
        const id = request.queryParams.id;
        const order = schema.orders.find(Number(id));

        if (order == null) {
            return {
                status: 222,
                body: {
                    message: 'Something went wrong when deleting',
                }
            };
        }

        order.destroy();
        return {
            status: 200,
            body: {
                message: 'Successful deletion',
            }
        };
    },

    getBasket: (schema) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401
            };
        }
        const user = jwtDecode(token);
        
        const res = schema.orders.all().models.filter(({ attrs }) => {
            return attrs.owner_id === Number(user.id) && attrs.status === 0;
        });
        let data = [];
        res.forEach(({ attrs }) => data = [ ...data, attrs ]);

        return {
            body: data,
            status: 200
        };
    },

    updateCount: (schema, request) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401
            }
        }
        const body = JSON.parse(request.requestBody);


        try {
            schema.orders.findBy({ id: body.id }).update({
                count: body.count,
            });
            return {
                status: 200,
                body: {
                    message: 'Successful update count',
                }
            };
        } catch (err) {
            return {
                status: 222,
                body: {
                    error: 'Something went wrong when updating status'
                }
            };
        }   
    },

    updateStatus: (schema, request) => {
        const token = cookieParser(document.cookie).access_token;
        if (token == undefined) {
            return {
                status: 401
            }
        }
        
        const body = JSON.parse(request.requestBody);

        try {
            schema.orders.findBy({ id: body.id }).update({
                status: body.status,
            });
            return {
                status: 200,
                body: {
                    message: 'Successful update status',
                }
            };
        } catch (err) {
            return {
                status: 222,
                body: {
                    message: 'Something went wrong when updating status',
                }
            };
        }   
    },
}