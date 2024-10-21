import parseJwt from "../utils/parseJwt";
import Cookies from "js-cookie";

const saveToken = async (token: string) => {
    const data = await parseJwt(token);
    const date = await new Date(data.exp * 1000);
    console.log(date);
    Cookies.set("access_token", token, {
        expires: date, // 만료시간
        sameSite: "Strict", // 같은 도메인에서만 전송
        secure: true,
    });
};

export default saveToken;