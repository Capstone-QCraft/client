enum INPUT_LENGTH {
    NAME = 20,
    EMAIL = 40,
    PASSWORD = 20,
    NUMBER = 6,
}

const isValidEmail = (email: string) => {
    if (email.includes("@")) {
        const parts = email.split("@");
        if (parts.length === 2 && parts[0] !== "" && parts[1] !== "") {
            return true;
        }
    }
    return false;
};

const regexName = (str: string) => {
    str = str.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
    if (str.length > INPUT_LENGTH.NAME) str = str.slice(0, INPUT_LENGTH.NAME);
    return str;
};

const regexEmail = (str: string) => {
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9@.]/g, "");
    if (str.length > INPUT_LENGTH.EMAIL) str = str.slice(0, INPUT_LENGTH.EMAIL);
    return str;
};

const regexPassword = (str: string) => {
    // 정규식 백엔드와 맞춰보기
    // 한글 -> 영어, D는 쌍ㅇ 없어서 일단 보류
    str = str.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]/g, "");
    if (str.length > INPUT_LENGTH.PASSWORD)
        str = str.slice(0, INPUT_LENGTH.PASSWORD);
    return str;
};

const regexNumber = (str: string) => {
    // todo 한글자 완성전 글자가 잠시 들어가짐
    str = str.replace(/[^0-9]/g, "");
    if (str.length > INPUT_LENGTH.NUMBER)
        str = str.slice(0, INPUT_LENGTH.NUMBER);
    return str;
};

export const validation = {
    isValidEmail,
    regexName,
    regexEmail,
    regexPassword,
    regexNumber,
}