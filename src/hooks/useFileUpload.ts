import { useQuery } from '@tanstack/react-query';
import { fileApi } from '../api';

const useFileUpload = (file: File) => {
    return useQuery({
        queryKey: ['fileUpload', file],
        queryFn: () => fileApi.fileUpload(file).then(res => res.data),
        enabled: false,
    });
};

export default useFileUpload;