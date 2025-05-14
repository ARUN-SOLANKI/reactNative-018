import { useMutation } from "@tanstack/react-query"
import { authApi } from "../utils/api/auth.api"
import { ToastAndroid } from "react-native"

type Payload =  {
    email: string
    password: string
}

export const useLoginMutaton = () => {
    return useMutation({
        mutationFn: async (data: Payload) => {
                const response = await authApi.login(data)
                return response.data
        },
    })
}