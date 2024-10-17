import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useEmailCkeck = (email: string) => {
    return useQuery({
        queryKey: ['emailCheck', email],
        queryFn: () => userApi.emailCheck(email).then(res => res.data),
        enabled: false,
    });
};

export default useEmailCkeck;