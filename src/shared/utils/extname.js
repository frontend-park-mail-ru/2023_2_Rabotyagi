export const extname = (path) => {
    const ext = /^.+\.([^.]+)$/.exec(path);

    return ext == null ? '' : ext[ 1 ];
};
