import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 질문 생성
const generate = async (fileId: string) => {
    const token = await Cookies.get('access_token');
    return axios.post(`${SERVER_URL}/interview/generate`,
        null,
        {
            params: { resumeFileId: fileId },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// 피드백 받기
const feedback = async (interviewId: string, answers: string[]) => {
    const token = await Cookies.get('access_token');
    return axios.post(`${SERVER_URL}/interview/feedback`,
        { interviewId, answers },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// 리스트
const list = async () => {
    const token = await Cookies.get('access_token');
    return axios.get(`${SERVER_URL}/interview/list`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// 기록
const history = async (interviewId: string) => {
    const token = await Cookies.get('access_token');
    return axios.get(`${SERVER_URL}/interview/${interviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// 삭제
const delHistory = async (interviewId: string) => {
    const token = await Cookies.get('access_token');
    return axios.delete(`${SERVER_URL}/interview/delete/${interviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};


export const interviewApi = {
    generate,
    feedback,
    list,
    history,
    delHistory,
};