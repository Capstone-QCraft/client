import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api"

const useUpdateInfo = (email: string, name: string, oldPassword: string, newPassword: string) => {
    return useQuery({
        queryKey: ['updateInfo'],
        queryFn: () => userApi.updateInfo(email, name, oldPassword, newPassword).then(res => res.data),
        enabled: false,
        retry: false,
    })
}

export default useUpdateInfo;

