// api/userApi.ts
import axios from 'axios';

const emailCheck = (email: string) => {
    return axios.post(`http://localhost:8080/member/email-check`, {
        email, // POST 요청의 body에 email 포함
    });
};

export const userApi = {
    emailCheck,
};