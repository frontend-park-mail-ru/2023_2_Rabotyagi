import { fakerRU } from '@faker-js/faker';

export const generatePosts = () => {
    var posts = [];
    for (let index = 0; index < 20; index++) {
        posts = [ ...posts, {
            "id": index,
            "image": '/images/' + Math.floor(Math.random() * (10 - 1) + 1) + '.jpg',
            "author": 0,
            "city": fakerRU.location.city(),
            "delivery": fakerRU.datatype.boolean(),
            "description": fakerRU.lorem.paragraph(),
            "price": fakerRU.finance.amount(500, 5000, 0),
            "safe": fakerRU.datatype.boolean(),
            "title": fakerRU.lorem.lines(1) 
        } ]
    }
    return posts;
}
