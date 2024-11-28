import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useAuthNumCheck = (email: string, authNum: number) => {
    return useQuery({
        queryKey: ['authNumCheck', email],
        queryFn: () => userApi.authNumCheck(email, authNum).then(res => res.data),
        enabled: false,
        retry: false,
    });
};

export default useAuthNumCheck;