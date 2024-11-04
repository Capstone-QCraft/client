import { useQuery } from '@tanstack/react-query';
import { interviewApi } from '../api';

const useFeedback = (fileId: string | null) => {
    return useQuery({
        queryKey: ['feedback', fileId],
        queryFn: () => interviewApi.feedback(fileId!).then(res => res.data),
        enabled: !!fileId,
        retry: false,
    });
};

export default useFeedback;