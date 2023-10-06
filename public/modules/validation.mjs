const EMAIL_REGEXP = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i;
const minLenPassword = 4;

function regexpEmail(email){
    return EMAIL_REGEXP.test(email)
}

/**
 * validateEmail() validate using regexp and check not empty
 * @param {string} email - email
 * @return {null|string} return null if validation ok and return string if not
 */
export function validateEmail(email) {
    if (email === '') {
        return 'Поле почты не может быть пустым'
    }
    if (!regexpEmail(email)) {
        return 'Некорректый email'
    }

    return null
}

/**
 * validatePassword() check not empty and min lengths
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