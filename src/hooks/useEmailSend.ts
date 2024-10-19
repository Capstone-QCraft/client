import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useEmailSend = (email: string) => {
    return useQuery({
        queryKey: ['emailSend', email],
        queryFn: () => userApi.emailSend(email).then(res => res.data),
        enabled: false,
    });
};

export default useEmailSend;