/**
 * @file Validation.mjs
 * @module validation
 */

/**
 * @constant {string} EMAIL_REGEXP
 */
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
function regexpEmail(email) {
    return EMAIL_REGEXP.test(email)
}

/**
 * @summary Валидация почты с использованием регулярки {@link validation:EMAIL_REGEXP}
 * @param {string} email - email
 * @return {null|string} return null if validation ok and return string if not
 */
export function validateEmail(email) {
    if (email === '') {
        return 'Поле почты не может быть пустым'
    }
    if (! regexpEmail(email)) {
        return 'Некорректый email'
    }

    return null
}

/**
 * @summary validatePassword() check not empty and min lengths
 * @param {string} password - password
 * @return {null|string} return null if validation ok and return string if not
 */
export function validatePassword(password) {
    if (password === '') {
        return 'Поле пароля не может быть пустым'
    }
    if (password.length < minLenPassword) {
        return `Пароль не должен быть короче ${minLenPassword} символов`
    }

    return null
}
