let accessToken: any = null;

export const setAccessToken = (token: string) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
};