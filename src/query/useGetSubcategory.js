import { useQuery } from "@tanstack/react-query"
import {categoriesApi} from '../utils/api/api'
import { ToastAndroid } from "react-native"

export const useGetSubcategory = () => {
    return useQuery({
        queryKey: ["useGetSubcategory"],
        queryFn: async () => {
            try {
                const response = await categoriesApi.getsubcategories()
                return response.data
            } catch (error) {
               ToastAndroid.show("Failed to Fetch", 300)
            }
           
        },
    })
}

export default useGetSubcategory