import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 이메일 중복 체크
const emailCheck = (email: string) => {
    return axios.post(`${apiUrl}/member/email-check`, {
        email,
    });
};

// 인증 이메일 전송
const emailSend = (email: string) => {
    return axios.post(`${apiUrl}/member/email-certification`, {
        email,
    });
};

// 인증 번호 확인
const authNumCheck = (email: string, authNum: number) => {
    return axios.post(`${apiUrl}/member/check-certification`, {
        email,
        certificationNumber: authNum
    });
};

// 회원가입
const signUp = (name: string, email: string, password: string, authNum: number) => {
    return axios.post(`${apiUrl}/member/sign-up`, {
        name,
        email,
        password,
        certificationNumber: authNum,
    });
};

// 로그인
const signIn = (email: string, password: string) => {
    return axios.post(`${apiUrl}/member/sign-in`, {
        email,
        password,
    });
};


export const userApi = {
    emailCheck,
    emailSend,
    authNumCheck,
    signUp,
    signIn,
};