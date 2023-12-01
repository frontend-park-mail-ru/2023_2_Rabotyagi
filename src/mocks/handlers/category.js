export const CATEGORY = {
    getFull: (schema) => ({
        body: schema.categories.all().models,
        status: 200,
    }),
};
