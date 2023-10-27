const uid = () => {
    return btoa(Date.now() + Math.random());
}

export default uid;