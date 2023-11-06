import { fakerRU } from '@faker-js/faker';

export const generatePost = (id) => {
    return {
        "id": id,
        "saler": {
            email: fakerRU.internet.email(),
            phone: "+7 999 999 99 99",
            name: fakerRU.person.fullName(),
        },
        "category": "Категория 1",
        "title": fakerRU.lorem.lines(1),
        "description": fakerRU.lorem.paragraphs(10),
        "price": fakerRU.finance.amount(500, 5000, 0),
        "created_at": Date.now(),
        "views": 0,
        "availableCount": Math.floor(Math.random() * (100 - 1) + 1),
        "city": fakerRU.location.city(),
        "delivery": fakerRU.datatype.boolean(),
        "safeDeal": fakerRU.datatype.boolean(),
        "image": '/images/' + Math.floor(Math.random() * (10 - 1) + 1) + '.jpg',
        "isActive": fakerRU.datatype.boolean()
    }
}
