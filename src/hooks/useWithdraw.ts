import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api"

const useWithdraw = () => {
    return useQuery({
        queryKey: ['withdraw'],
        queryFn: () => userApi.withdraw().then(res => res.data),
        enabled: false,

    })
}

export default useWithdraw;

