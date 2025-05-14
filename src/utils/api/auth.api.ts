import { getClient } from "../../data-providers"

type Payload = {
    email: string
    password: string
}


export class AuthApi {
    private client

    constructor(client) {
        this.client = client
    }

    async login(data: Payload) {
        return this.client.post('login' , data)
    }

}

export const authApi = new AuthApi(getClient('user'))
