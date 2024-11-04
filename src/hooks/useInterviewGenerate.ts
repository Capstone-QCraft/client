import { useQuery } from '@tanstack/react-query';
import { interviewApi } from '../api';

const useInterviewGenerate = (fileId: string | null) => {
    return useQuery({
        queryKey: ['interviewGenerate', fileId],
        queryFn: () => interviewApi.generate(fileId!).then(res => res.data),
        enabled: !!fileId,
        retry: false,
    });
};

export default useInterviewGenerate;