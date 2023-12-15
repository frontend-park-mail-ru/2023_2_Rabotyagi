export const extname = (path: string) => {
    const ext = /^.+\.([^.]+)$/.exec(path);

    return ext == null ? '' : ext[ 1 ];
};
