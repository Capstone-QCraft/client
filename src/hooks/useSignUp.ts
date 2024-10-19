import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useSignUp = (name: string, email: string, password: string, authNum: number) => {
    return useQuery({
        queryKey: ['signUp', email],
        queryFn: () => userApi.signUp(name, email, password, authNum).then(res => res.data),
        enabled: false,
    });
};

export default useSignUp;