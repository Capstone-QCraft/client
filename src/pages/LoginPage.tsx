import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import "./LoginPage.css";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

enum ErrorMessages {
  EMPTY = "",
  EMAIL_EMPTY = "이메일을 입력해 주세요.",
  PASSWORD_EMPTY = "비밀번호를 입력해 주세요.",
  FAILED_LOGIN = "이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.",
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = useState(true);
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage(ErrorMessages.EMPTY);
    if (loginEmail === "") {
      if (loginEmailRef.current) {
        setLoginErrorMessage(ErrorMessages.EMAIL_EMPTY);
        loginEmailRef.current.focus();
      }
    } else if (loginPassword === "") {
      if (loginPasswordRef.current) {
        setLoginErrorMessage(ErrorMessages.PASSWORD_EMPTY);
        loginPasswordRef.current.focus();
      }
    } else {
      // 로그인 로직 처리
      // setLoginErrorMessage(ErrorMessages.FAILED_LOGIN);
      dispatch(login());
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage(ErrorMessages.EMPTY);
    // todo 회원가입 로직
  };

  return (
    <>
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
              onChange={(e) => setLoginEmail(e.target.value)}
              inputRef={loginEmailRef}
            />
            <InputField
              label="비밀번호"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              inputRef={loginPasswordRef}
            />
            <p className="error-message">{loginErrorMessage}</p>
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          {/* <a>비밀번호 찾기</a> */}
          <hr />
          <a>간편 로그인</a>
          <div>
            <a>네이버</a>
            <a>구글</a>
            <a>카카오</a>
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
              onChange={(e) => setSignupName(e.target.value)}
              inputRef={signupNameRef}
            />
            <div className="input-with-button">
              <InputField
                label="이메일"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                inputRef={signupEmailRef}
              />
              <button className="auth-button">인증</button>
            </div>
            <div className="input-with-button">
              <InputField
                label="인증번호"
                type="number"
                value={signupNumber}
                onChange={(e) => setSignupNumber(e.target.value)}
                inputRef={signupNumbereRef}
              />
              <button className="auth-button">인증</button>
            </div>
            <InputField
              label="비밀번호"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              inputRef={signupPasswordeRef}
            />
            <InputField
              label="비밀번호 확인"
              type="password"
              value={signupPasswordCheck}
              onChange={(e) => setSignupPasswordCheck(e.target.value)}
              inputRef={signupPasswordCheckRef}
            />
            <p className="error-message">{signupErrorMessage}</p>
            <button type="submit" className="login-button">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
