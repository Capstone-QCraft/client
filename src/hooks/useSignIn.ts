import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useSignIn = (email: string, password: string) => {
    return useQuery({
        queryKey: ['signIn', email],
        queryFn: () => userApi.signIn(email, password).then(res => res.data),
        enabled: false,
        retry: false,
    });
};

export default useSignIn;