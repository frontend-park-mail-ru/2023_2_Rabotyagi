import { fakerRU } from "@faker-js/faker";

export const generateUser = () => {
    return {
        email: fakerRU.internet.email(),
        phone: "+7 999 999 99 99",
        name: fakerRU.person.fullName(),
        birthday: fakerRU.date.birthdate(),
        avatar: {
            String: '',
            Valid: false
        }
    }
};