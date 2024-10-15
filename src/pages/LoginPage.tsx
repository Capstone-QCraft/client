import React, { useState, useRef } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./LoginPage.css";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import useEmailCkeck from "../hooks/useFetchUser";

enum ErrorMessages {
  EMPTY = "",
  EMAIL_EMPTY = "이메일을 입력해 주세요.",
  PASSWORD_EMPTY = "비밀번호를 입력해 주세요.",
  FAILED_LOGIN = "이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.",
  NAME_EMPTY = "이름을 입력해 주세요.",
}

enum INPUT_LENGTH {
  NAME = 20,
  EMAIL = 40,
  PASSWORD = 20,
  NUMBER = 4,
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupNumber, setSignupNumber] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordCheck, setSignupPasswordCheck] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState(
    ErrorMessages.EMPTY
  );
  const [signupErrorMessage, setSignupErrorMessage] = useState(
    ErrorMessages.EMPTY
  );
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);
  const signupNameRef = useRef<HTMLInputElement>(null);
  const signupEmailRef = useRef<HTMLInputElement>(null);
  const signupNumbereRef = useRef<HTMLInputElement>(null);
  const signupPasswordeRef = useRef<HTMLInputElement>(null);
  const signupPasswordCheckRef = useRef<HTMLInputElement>(null);

  // 비밀번호 조건
  const [over8, setOver8] = useState(false); // 8자 이상
  const [useUpperCase, setUseUpperCase] = useState(false); // 대문자 사용
  const [useLowerCase, setUseLowerCase] = useState(false); // 소문자 사용
  const [useNumber, setUseNumber] = useState(false); // 숫자 사용
  const [useSpecial, setUseSpecial] = useState(false); // 특수문자 사용

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage(ErrorMessages.EMPTY);
    if (loginEmail === "") {
      setLoginErrorMessage(ErrorMessages.EMAIL_EMPTY);
      if (loginEmailRef.current) loginEmailRef.current.focus();
    } else if (loginPassword === "") {
      setLoginErrorMessage(ErrorMessages.PASSWORD_EMPTY);
      if (loginPasswordRef.current) loginPasswordRef.current.focus();
    } else {
      // 로그인 로직 처리
      // setLoginErrorMessage(ErrorMessages.FAILED_LOGIN);
      dispatch(login());
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrorMessage(ErrorMessages.EMPTY);
    if (signupName === "") {
      setSignupErrorMessage(ErrorMessages.NAME_EMPTY);
      if (signupNameRef.current) signupNameRef.current.focus();
    } else if (signupEmail === "") {
      setSignupErrorMessage(ErrorMessages.EMAIL_EMPTY);
      if (signupEmailRef.current) signupEmailRef.current.focus();
    } else {
      // todo 회원가입 로직
    }
  };

  const handleSendNumber = (e: React.FormEvent) => {
    e.preventDefault();
    // todo 인증번호 전송 로직
    // const { data, isLoading, isError } = useEmailCkeck("yp071704@naver.com");
  };

  const handleAuthNumber = (e: React.FormEvent) => {
    e.preventDefault();
    // todo 인증번호 인증 로직
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
  const regexPasswordCheck = (str: string) => {
    str = regexPassword(str);
    if (str.length >= 8) setOver8(true);
    else setOver8(false);
    if (/[A-Z]/.test(str)) setUseUpperCase(true);
    else setUseUpperCase(false);
    if (/[a-z]/.test(str)) setUseLowerCase(true);
    else setUseLowerCase(false);
    if (/[0-9]/.test(str)) setUseNumber(true);
    else setUseNumber(false);
    if (/[^a-zA-Z0-9\s]/.test(str)) setUseSpecial(true);
    else setUseSpecial(false);
    return str;
  };
  const regexNumber = (str: string) => {
    // todo 한글자 완성전 글자가 잠시 들어가짐
    str = str.replace(/[^0-9]/g, "");
    if (str.length > INPUT_LENGTH.NUMBER)
      str = str.slice(0, INPUT_LENGTH.NUMBER);
    return str;
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{isFlipped ? "회원가입" : "로그인"}</title>
      </Helmet>
      <div className="auth-container">
        <div
          className={`card ${isFlipped ? "card-back" : ""}`}
          onClick={() => {
            if (isFlipped) {
              handleFlip();
            }
          }}
        >
          <h1>로그인</h1>
          <form onSubmit={handleLoginSubmit}>
            <InputField
              label="이메일"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(regexEmail(e.target.value))}
              inputRef={loginEmailRef}
            />
            <InputField
              label="비밀번호"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(regexPassword(e.target.value))}
              inputRef={loginPasswordRef}
            />
            <p className="error-message">{loginErrorMessage}</p>
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          {/* <a>비밀번호 찾기</a> */}
          <hr />
          <p>간편 로그인</p>
          <div>
            <p>네이버</p>
            <p>구글</p>
            <p>카카오</p>
          </div>
        </div>

        <div
          className={`card ${isFlipped ? "" : "card-back"}`}
          onClick={() => {
            if (!isFlipped) {
              handleFlip();
            }
          }}
        >
          <h1>회원가입</h1>
          <form onSubmit={handleSignupSubmit}>
            <InputField
              label="이름"
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(regexName(e.target.value))}
              inputRef={signupNameRef}
            />
            <div className="input-with-button">
              <InputField
                label="이메일"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(regexEmail(e.target.value))}
                inputRef={signupEmailRef}
              />
              <button className="auth-button" onClick={handleSendNumber}>
                인증번호 발송
              </button>
            </div>
            <div className="input-with-button">
              <InputField
                label="인증번호"
                type="number"
                value={signupNumber}
                onChange={(e) => setSignupNumber(regexNumber(e.target.value))}
                inputRef={signupNumbereRef}
              />
              <button className="auth-button" onClick={handleAuthNumber}>
                인증하기
              </button>
            </div>
            <InputField
              label="비밀번호"
              type="password"
              value={signupPassword}
              onChange={(e) =>
                setSignupPassword(regexPasswordCheck(e.target.value))
              }
              inputRef={signupPasswordeRef}
            />
            <div className="password-condition-container">
              <p style={over8 ? { color: "green" } : {}}>8자 이상</p>
              <p style={useUpperCase ? { color: "green" } : {}}>대문자</p>
              <p style={useLowerCase ? { color: "green" } : {}}>소문자</p>
              <p style={useNumber ? { color: "green" } : {}}>숫자</p>
              <p style={useSpecial ? { color: "green" } : {}}>특수문자(~)</p>
            </div>
            <InputField
              label="비밀번호 확인"
              type="password"
              value={signupPasswordCheck}
              onChange={(e) =>
                setSignupPasswordCheck(regexPassword(e.target.value))
              }
              inputRef={signupPasswordCheckRef}
            />
            <p className="error-message">{signupErrorMessage}</p>
            <button type="submit" className="login-button">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default LoginPage;
