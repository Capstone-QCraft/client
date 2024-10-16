import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useEmailCkeck = (userEmail: string) => {
    return useQuery({
        queryKey: ['userEmail', userEmail],
        queryFn: () => userApi.emailCheck(userEmail).then(res => res.data),
        // staleTime: 5 * 60 * 1000, // 5분 동안 데이터 유효
        // cacheTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
        enabled: false,
    });
};

export default useEmailCkeck;