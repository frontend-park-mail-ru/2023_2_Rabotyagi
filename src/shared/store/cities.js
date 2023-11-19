import { CityApi } from "../api/city";

export const cities = {
    init: async function() {
        const res = await CityApi.getAll();
        this.list = res.body;
    },

    getById: function(id) {
        return this.list.find((value) => value.id === id);
    },

    refresh: async function() {
        const res = await CityApi.getAll();
        this.list = res.body;
    },
    list: null,
}