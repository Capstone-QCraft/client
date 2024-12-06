import apiClient from './apiClient';

// 질문 생성
const generate = async (fileId: string) => {

    return apiClient.post('/interview/generate',
        null,
        {
            params: { resumeFileId: fileId },
        })
};

// 피드백 받기
const feedback = async (interviewId: string, answers: string[]) => {
    return apiClient.post('/interview/feedback', { interviewId, answers });
};

// 리스트
const list = async (page: number, size: number, direction: string = "DESC") => {
    return apiClient.get('/interview/list', {
        params: { page, size, direction },
    });
};

// 기록
const history = async (interviewId: string) => {
    return apiClient.get(`/interview/${interviewId}`);
};

// 삭제
const delHistory = async (interviewId: string) => {
    return apiClient.delete(`/interview/delete/${interviewId}`);
};


export const interviewApi = {
    generate,
    feedback,
    list,
    history,
    delHistory,
};