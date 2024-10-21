import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';

const useGetInfo = () => {
    return useQuery({
        queryKey: ['getInfo'],
        queryFn: () => userApi.getInfo().then(res => res.data),
    });
};

export default useGetInfo;