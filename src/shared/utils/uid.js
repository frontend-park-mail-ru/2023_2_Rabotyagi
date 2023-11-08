const uid = () => {
    return Date.now() + Math.floor(Math.random() * (9999 - 1) + 1);
}

export default uid;