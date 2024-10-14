import axios from 'axios';

const emailCheck = (email: string) => {
    return axios.get(`/member/email-check`);
};

export const userApi = {
    emailCheck,
};