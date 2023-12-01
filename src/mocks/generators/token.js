import sign from 'jwt-encode';

export const setNewToken = (data, name='access_token') => {
    const now = new Date();
    const cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000);
    const token = sign(data, 'xxx');

    document.cookie = `${name}=${token}; path=/; expires=${cookieExpiration.toUTCString()};`;
};
