let accessToken: any = null;

export const setAccessToken = (token: any) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
};