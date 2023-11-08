import { fakerRU } from '@faker-js/faker';

export const generatePost = (salerId) => {
    return {
        saler_id: salerId,
        category: "Категория 1",
        title: fakerRU.lorem.lines(1),
        description: fakerRU.lorem.paragraphs(10),
        price: fakerRU.finance.amount(500, 5000, 0),
        created_at: new Date().toUTCString(),
        views: 0,
        available_count: Math.floor(Math.random() * (100 - 1) + 1),
        city: fakerRU.location.city(),
        delivery: fakerRU.datatype.boolean(),
        safe_deal: fakerRU.datatype.boolean(),
        images: [
            {
                url: '/images/' + Math.floor(Math.random() * (10 - 1) + 1) + '.jpg'
            }
        ],
        is_active: fakerRU.datatype.boolean()
    }
}
