/**
 * @file Validation.mjs
 * @module validation
 */

/**
 * @constant {string} EMAIL_REGEXP
 */
//eslint-disable-next-line no-useless-escape
const EMAIL_REGEXP = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i;
/**
 * @constant {string} minLenPassword
 */
const minLenPassword = 4;

/**
 * @summary Функция проверяющая почту на валидность
 * @param {string} email Почта юзера
 * @returns {boolean}
 */
function regexpEmail(email: string): boolean {
    return EMAIL_REGEXP.test(email);
}

export class Validate {
    /**
     * @summary validatePassword() check not empty and min lengths
     * @param {string} password - password
     * @return {null|string} return null if validation ok and return string if not
     */
    static password(password: string): string | null {
        if (!password) {
            return 'Поле пароля не может быть пустым';
        }

        password = password.trim();

        if (password === '') {
            return 'Поле пароля не может быть пустым';
        }
        if (password.length < minLenPassword) {
            return `Пароль не должен быть короче ${minLenPassword} символов`;
        }

        return null;
    }

    static passwordEqual(password: string, passwordRepeat: string): string | null {
        password = password.trim();
        passwordRepeat = passwordRepeat.trim();

        if (password !== passwordRepeat){
            return 'Пароли не совпадают';
        }

        return null;
    }

    /**
     * @summary Валидация почты с использованием регулярки {@link validation:EMAIL_REGEXP}
     * @param {string} email - email
     * @return {null|string} return null if validation ok and return string if not
     */
    static email(email: string): string | null {
        if (!email) {
            return 'Поле почты не может быть пустым';
        }

        email = email.trim();

        if (email === '') {
            return 'Поле почты не может быть пустым';
        }
        if (!regexpEmail(email)) {
            return 'Некорректый email';
        }

        return null;
    }

    static phone(phone: string): string | null {
        if (!phone) {
            return 'Поле телефона не может быть пустым';
        }

        phone = phone.trim();

        if (phone === '') {
            return 'Поле телефона не может быть пустым';
        }

        return null;
    }

    static username(name: string): string | null {
        if (!name) {
            return 'Поле имени не может быть пустым';
        }

        name = name.trim();

        if (name === '') {
            return 'Поле имени не может быть пустым';
        }

        return null;
    }
}
