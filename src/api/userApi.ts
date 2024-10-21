import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 이메일 중복 체크
const emailCheck = (email: string) => {
    return axios.post(`${SERVER_URL}/member/email-check`, {
        email,
    });
};

// 인증 이메일 전송
const emailSend = (email: string) => {
    return axios.post(`${SERVER_URL}/member/email-certification`, {
        email,
    });
};

// 인증 번호 확인
const authNumCheck = (email: string, authNum: number) => {
    return axios.post(`${SERVER_URL}/member/check-certification`, {
        email,
        certificationNumber: authNum
    });
};

// 회원가입
const signUp = (name: string, email: string, password: string, authNum: number) => {
    return axios.post(`${SERVER_URL}/member/sign-up`, {
        name,
        email,
        password,
        certificationNumber: authNum,
    });
};

// 로그인
const signIn = (email: string, password: string) => {
    return axios.post(`${SERVER_URL}/member/sign-in`, {
        email,
        password,
    });
};

// 회원 정보
const getInfo = async () => {
    const token = await Cookies.get('access_token');
    return axios.get(`${SERVER_URL}/member/get-info`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// 회원정보 변경
const updateInfo = async (email: string, name: string, oldPassword: string, newPassword: string) => {
    const token = await Cookies.get('access_token');
    return axios.put(`${SERVER_URL}/member/update-info`,
        { email, name, oldPassword, newPassword },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

// todo 회원 탈퇴
const withdraw = async () => {
    const token = await Cookies.get('access_token');
    return axios.delete(`${SERVER_URL}/member/withdraw`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
};

export const userApi = {
    emailCheck,
    emailSend,
    authNumCheck,
    signUp,
    signIn,
    getInfo,
    updateInfo,
    withdraw,
};