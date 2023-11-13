export const extname = (path) => {
    var ext = /^.+\.([^.]+)$/.exec(path);
    return ext == null ? "" : ext[ 1 ];
}