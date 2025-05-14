import { getClient } from "../../data-providers"


export class CategoriesApi {
    private client

    constructor(client) {
        this.client = client
    }

    async getsubcategories() {
        return this.client.get('get-all')
    }

}

export const categoriesApi = new CategoriesApi(getClient('subCategory'))
