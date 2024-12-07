import axios from 'axios';
import apiClient from './apiClient';

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
    }, {
        withCredentials: true, // 쿠키 전송 허용
    });
};

// 로그아웃
const signOut = async () => {
    return axios.post(`${SERVER_URL}/member/sign-out`, null, {
        withCredentials: true, // 쿠키 전송 허용
    });
};

// 회원 정보
const getInfo = async () => {
    return apiClient.get("/member/get-info");
};

// 회원정보 변경
const updateInfo = async (email: string, name: string, oldPassword: string, newPassword: string) => {
    return apiClient.put('/member/update-info', { email, name, oldPassword, newPassword });
};

// todo 회원 탈퇴
const withdraw = async () => {
    return apiClient.delete('/member/withdraw', {
        withCredentials: true,
    });
};

// access token 재발급
const refreshToken = () => {
    return axios.post(
        `${SERVER_URL}/member/refresh-token`, null,
        {
            withCredentials: true,
        }
    );
};

export const userApi = {
    emailCheck,
    emailSend,
    authNumCheck,
    signUp,
    signIn,
    signOut,
    getInfo,
    updateInfo,
    withdraw,
    refreshToken,
};