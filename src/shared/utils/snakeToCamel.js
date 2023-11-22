export const toCamelCaseKeys = (obj) => {
    if (!obj) {
        return obj;
    }

    if (Array.isArray(obj)){
        const result = obj.map((item) => {
            if (typeof item === 'object') {
                return toCamelCaseKeys(item);
            }

            return item;
        });

        return result;
    }

    obj = Object.entries(obj).map(([ key, item ]) => {
        if (typeof item === 'object') {
            return { [ toCamelCaseKeys(key) ]: item };
        }

        return { [ snakeToCamel(key) ]: item };
    });

    let result;
    obj.forEach((elem) => result = { ...result, ...elem });

return result;
};

export const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );
