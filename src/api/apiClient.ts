import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/accessTokenManager";
import { userApi } from "./userApi";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const apiClient = axios.create({
    baseURL: SERVER_URL,
    // timeout: 5000, // 질문 생성 5초 이상 걸려서 주석 처리
});

export const setupAxiosInterceptors = (store: any) => {
    apiClient.interceptors.request.use(
        async (config) => {
            let token = await getAccessToken();
            console.log("token1", token);

            if (!token) {
                console.log("토큰이 비어있다.");
                const res = await userApi.refreshToken();
                const newAccessToken = res.data.body.accessToken;
                store.dispatch(login({ accessToken: newAccessToken }));
                token = newAccessToken;
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error); // 요청 오류 처리
        }
    );
};

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 에러 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 방지 플래그 설정

            console.log('test')


            // try {
            //     const newToken = await refreshAccessToken(); // 새 토큰 발급 요청
            //     if (newToken) {
            //         originalRequest.headers.Authorization = `Bearer ${newToken}`; // 새 토큰으로 요청 헤더 업데이트
            //         return apiClient(originalRequest); // 요청 재시도
            //     }
            // } catch (refreshError) {
            //     console.error("Failed to refresh token:", refreshError);
            //     return Promise.reject(refreshError);
            // }
        }

        return Promise.reject(error);
    }
);

export default apiClient;