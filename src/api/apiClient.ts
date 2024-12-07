import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/accessTokenManager";
import { userApi } from "./userApi";
import { login, logout } from "../store/authSlice";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const apiClient = axios.create({
    baseURL: SERVER_URL,
    // timeout: 5000, // 질문 생성 5초 이상 걸려서 주석 처리
});

export const setupAxiosInterceptors = (store: any) => {
    // 헤더에 토큰 포함, 페이지 새로고침 등으로 토큰이 없을 경우 재발급
    apiClient.interceptors.request.use(
        async (config) => {
            let token = await getAccessToken();
            if (!token) {
                const res = await userApi.refreshToken();
                const newAccessToken = res.data.body.accessToken;
                store.dispatch(login({ accessToken: newAccessToken }));
                token = newAccessToken;
            }
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error); // 요청 오류 처리
        }
    );

    // 토큰 만료 등으로 401 떴을 때 토큰 재발급
    apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // 401 에러 처리 (Access Token 만료)
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    console.log("Access token expired, refreshing...");

                    // Refresh Token으로 새 Access Token 요청
                    const res = await userApi.refreshToken();
                    const newAccessToken = res.data.body.accessToken;

                    // Redux 상태 및 로컬 저장소 업데이트
                    store.dispatch(login({ accessToken: newAccessToken }));
                    setAccessToken(newAccessToken);

                    // 새 Access Token으로 원래 요청 재시도
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh token during response:", refreshError);
                    // Refresh Token도 만료된 경우 로그아웃
                    store.dispatch(logout())
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error); // 기타 에러 처리
        }
    );
};

export default apiClient;