import axios from 'axios';
import { getAccessToken } from '../utils/accessTokenManager';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 파일 업로드
const fileUpload = async (file: File) => {
    const token = await getAccessToken();
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${SERVER_URL}/file/upload`, formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
};


export const fileApi = {
    fileUpload,
};