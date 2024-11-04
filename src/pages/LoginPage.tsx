import React, { useState, useRef } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./LoginPage.css";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import useEmailCkeck from "../hooks/useEmailCheck";
import useEmailSend from "../hooks/useEmailSend";
import useAuthNumCheck from "../hooks/useAuthNumCheck";
import { validation } from "../utils/validation";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import OauthButton from "../components/OauthButton";
import saveToken from "../utils/saveToken";
import PasswordCondition, { regexTF } from "../components/PasswordCondition";

enum ErrorMessages {
  EMPTY = "",

  FAILED_LOGIN = "이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요.",

  NAME_EMPTY = "이름을 입력해 주세요.",
  EMAIL_EMPTY = "이메일을 입력해 주세요.",
  NUMBER_EMPTY = "인증번호를 입력해 주세요.",
  PASSWORD_EMPTY = "비밀번호를 입력해 주세요.",
  UNAVAILABLE_EMAIL = "사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요.",
  INVALID_AUTH_NUMBER = "인증번호가 유효하지 않습니다.",
  PASSWORD_CHECK_EMPTY = "비밀번호 확인을 입력해 주세요.",
  INVALID_EMAIL_FORMAT = "잘못된 이메일 형식입니다.",
  REQUIRES_DUPLICATE_EMAIL_CHECK = "이메일 중복 확인이 필요합니다.",
  REQUIRES_AUTH = "인증을 완료해 주세요.",
  PASSWORD_REGEX = "8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
  PASSWORD_MISSMATCH = "비밀번호가 일치하지 않습니다.",
}

const LoginPage = () => {
  // input fields
  const [loginEmail, setLoginEmail] = useState(""); // 로그인 이메일
  const [loginPassword, setLoginPassword] = useState(""); // 로그인 패스워드
  const [signupName, setSignupName] = useState(""); // 회원가입 이름
  const [signupEmail, setSignupEmail] = useState(""); // 회원가입 이메일
  const [signupNumber, setSignupNumber] = useState(""); // 회원가입 인증번호
  const [signupPassword, setSignupPassword] = useState(""); // 회원가입 비밀번호
  const [signupPasswordCheck, setSignupPasswordCheck] = useState(""); // 회원가입 비밀번호 확인

  const dispatch = useDispatch();

  const [isFlipped, setIsFlipped] = useState(false); // 로그인, 회원가입 창 토글
  const [duplicationCheck, setDuplicationCheck] = useState(false); // 이메일 중복 확인 여부
  const [sendEmail, setSendEmail] = useState(false); // 인증 이메일 전송 여부
  const [numberAuth, setNumberAuth] = useState(false); // 인증 완료 여부
  const [loginErrorMessage, setLoginErrorMessage] = useState(
    ErrorMessages.EMPTY
  ); // 로그인 에러 메시지
  const [signupErrorMessage, setSignupErrorMessage] = useState(
    ErrorMessages.EMPTY
  ); // 회원가입 에러 메시지

  // input focus, disable 위한 ref
  const loginEmailRef = useRef<HTMLInputElement>(null); // 로그인 이메일
  const loginPasswordRef = useRef<HTMLInputElement>(null); // 로그인 패스워드
  const signupNameRef = useRef<HTMLInputElement>(null); // 회원가입 이름
  const signupEmailRef = useRef<HTMLInputElement>(null); // 회원가입 이메일
  const signupNumbereRef = useRef<HTMLInputElement>(null); // 회원가입 인증번호
  const signupPasswordeRef = useRef<HTMLInputElement>(null); // 회원가입 비밀번호
  const signupPasswordCheckRef = useRef<HTMLInputElement>(null); // 회원가입 비밀번호 확인

  // button disable 위한 ref
  const duplicationButtonRef = useRef<HTMLButtonElement>(null); // 중복 확인 버튼
  const authButtonRef = useRef<HTMLButtonElement>(null); // 인증 하기 버튼

  // api
  const { refetch: emailCheckRefetch } = useEmailCkeck(signupEmail);
  const { refetch: emailSendRefetch } = useEmailSend(signupEmail);
  const { refetch: numberCheckRefetch } = useAuthNumCheck(
    signupEmail,
    Number(signupNumber)
  );
  const { refetch: signUpRefetch } = useSignUp(
    signupName,
    signupEmail,
    signupPassword,
    Number(signupNumber)
  );
  const { refetch: SignInRefetch } = useSignIn(loginEmail, loginPassword);

  // 로그인, 회원가입 창 전환
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 로그인
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage(ErrorMessages.EMPTY);
    if (loginEmail === "") {
      // 이메일 필드가 비어 있다면
      setLoginErrorMessage(ErrorMessages.EMAIL_EMPTY);
      if (loginEmailRef.current) loginEmailRef.current.focus();
    } else if (loginPassword === "") {
      // 비밀번호 필드가 비어 있다면
      setLoginErrorMessage(ErrorMessages.PASSWORD_EMPTY);
      if (loginPasswordRef.current) loginPasswordRef.current.focus();
    } else {
      const { data, isSuccess } = await SignInRefetch();
      if (isSuccess) {
        console.log(data.accessToken);
        saveToken(data.accessToken);
        dispatch(login()); // 로그인 성공
      } else setLoginErrorMessage(ErrorMessages.FAILED_LOGIN); // 로그인 실패
    }
  };

  // 회원가입
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrorMessage(ErrorMessages.EMPTY);
    if (signupName === "") {
      // 이름 필드가 비어 있다면
      setSignupErrorMessage(ErrorMessages.NAME_EMPTY);
      if (signupNameRef.current) signupNameRef.current.focus();
    } else if (signupEmail === "") {
      // 이메일 필드가 비어 있다면
      setSignupErrorMessage(ErrorMessages.EMAIL_EMPTY);
      if (signupEmailRef.current) signupEmailRef.current.focus();
      // 이메일 중복체크 하지 않았다면
    } else if (!duplicationCheck) {
      setSignupErrorMessage(ErrorMessages.REQUIRES_DUPLICATE_EMAIL_CHECK);
      if (duplicationButtonRef.current) duplicationButtonRef.current.focus();
    } else if (signupNumber === "") {
      // 인증번호 필드가 비어 있다면
      setSignupErrorMessage(ErrorMessages.NUMBER_EMPTY);
      if (signupNumbereRef.current) signupNumbereRef.current.focus();
    } else if (!numberAuth) {
      // 인증하기 하지 않았다면
      setSignupErrorMessage(ErrorMessages.REQUIRES_AUTH);
      if (authButtonRef.current) authButtonRef.current.focus();
    } else if (signupPassword === "") {
      // 비밀번호 필드가 비어 있다면
      setSignupErrorMessage(ErrorMessages.PASSWORD_EMPTY);
      if (signupPasswordeRef.current) signupPasswordeRef.current.focus();
    } else if (!regexTF(signupPassword)) {
      // 비밀번호 형식이 맞지 않다면
      setSignupErrorMessage(ErrorMessages.PASSWORD_REGEX);
      if (signupPasswordeRef.current) signupPasswordeRef.current.focus();
    } else if (signupPasswordCheck === "") {
      // 비밀번호 확인 필드가 비어 있다면
      setSignupErrorMessage(ErrorMessages.PASSWORD_CHECK_EMPTY);
      if (signupPasswordCheckRef.current)
        signupPasswordCheckRef.current.focus();
    } else if (signupPassword !== signupPasswordCheck) {
      // 비밀번호와 비밀번호 확인이 같지 않다면
      setSignupErrorMessage(ErrorMessages.PASSWORD_MISSMATCH);
      if (signupPasswordCheckRef.current)
        signupPasswordCheckRef.current.focus();
    } else {
      // 회원가입 완료 로직
      const { isSuccess } = await signUpRefetch();
      if (isSuccess) {
        window.location.reload();
      }
    }
  };

  // 이메일 중복 확인 & 인증 번호 전송
  const handleSendNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrorMessage(ErrorMessages.EMPTY);
    // 이메일 중복 확인
    if (!duplicationCheck) {
      // 이메일 비어있을 경우
      if (!signupEmail) {
        if (signupEmailRef.current) signupEmailRef.current.focus();
        setSignupErrorMessage(ErrorMessages.EMAIL_EMPTY);
        return;
      }
      // 이메일 형식에 맞지 않을 경우
      if (!validation.isValidEmail(signupEmail)) {
        if (signupEmailRef.current) signupEmailRef.current.focus();
        setSignupErrorMessage(ErrorMessages.INVALID_EMAIL_FORMAT);
        return;
      }
      // 이메일 중복 확인 api 실행
      const { isSuccess } = await emailCheckRefetch();
      if (isSuccess) {
        if (signupEmailRef.current) signupEmailRef.current.disabled = true;
        setDuplicationCheck(true);
      } else {
        // 사용 불가능한 이메일
        if (signupEmailRef.current) signupEmailRef.current.focus();
        setSignupErrorMessage(ErrorMessages.UNAVAILABLE_EMAIL);
      }

      // 인증 번호 전송
    } else {
      emailSendRefetch();
      setSendEmail(true);
      // todo 재전송 버튼 클릭 가능 딜레이
    }
  };

  // 인증 번호 확인
  const handleAuthNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupErrorMessage(ErrorMessages.EMPTY);
    // 인증번호 필드가 비어 있다면
    if (signupNumber === "") {
      setSignupErrorMessage(ErrorMessages.NUMBER_EMPTY);
      if (signupNumbereRef.current) signupNumbereRef.current.focus();
      return;
    }
    const { isSuccess } = await numberCheckRefetch();
    if (isSuccess) {
      // 인증 번호 인증 성공
      setNumberAuth(true);
      if (signupNumbereRef.current) signupNumbereRef.current.disabled = true;
      if (duplicationButtonRef.current)
        duplicationButtonRef.current.disabled = true;
      if (authButtonRef.current) authButtonRef.current.disabled = true;
    } else {
      // 인증 번호 인증 실패
      setSignupErrorMessage(ErrorMessages.INVALID_AUTH_NUMBER);
      if (signupNumbereRef.current) signupNumbereRef.current.focus();
    }
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
              id="loginEmail"
              label="이메일"
              type="email"
              value={loginEmail}
              onChange={(e) =>
                setLoginEmail(validation.regexEmail(e.target.value))
              }
              inputRef={loginEmailRef}
            />
            <InputField
              id="loginPassword"
              label="비밀번호"
              type="password"
              value={loginPassword}
              onChange={(e) =>
                setLoginPassword(validation.regexPassword(e.target.value))
              }
              inputRef={loginPasswordRef}
            />
            <p className="error-message">{loginErrorMessage}</p>
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          {/* <a>비밀번호 찾기</a> */}
          <hr />
          <p className="auth-title">간편 로그인</p>
          <div>
            <OauthButton type="kakao" />
            <OauthButton type="google" />
            <OauthButton type="naver" />
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
              id="signupName"
              label="이름"
              type="text"
              value={signupName}
              onChange={(e) =>
                setSignupName(validation.regexName(e.target.value))
              }
              inputRef={signupNameRef}
            />
            <div className="input-with-button">
              <InputField
                id="signupEmail"
                label="이메일"
                type="email"
                value={signupEmail}
                onChange={(e) =>
                  setSignupEmail(validation.regexEmail(e.target.value))
                }
                inputRef={signupEmailRef}
              />
              <button
                className="auth-button"
                onClick={handleSendNumber}
                ref={duplicationButtonRef}
              >
                {duplicationCheck
                  ? sendEmail
                    ? "재전송"
                    : "인증번호 전송"
                  : "중복 확인"}
              </button>
            </div>
            <div className="input-with-button">
              <InputField
                id="signupCode"
                label="인증번호"
                type="number"
                value={signupNumber}
                onChange={(e) =>
                  setSignupNumber(validation.regexNumber(e.target.value))
                }
                inputRef={signupNumbereRef}
              />
              <button
                className="auth-button"
                onClick={handleAuthNumber}
                ref={authButtonRef}
              >
                {numberAuth ? "완료" : "인증하기"}
              </button>
            </div>
            <InputField
              id="signupPassword"
              label="비밀번호"
              type="password"
              value={signupPassword}
              onChange={(e) =>
                setSignupPassword(validation.regexPassword(e.target.value))
              }
              inputRef={signupPasswordeRef}
            />
            <PasswordCondition password={signupPassword} />

            <InputField
              id="signupPasswordCheck"
              label="비밀번호 확인"
              type="password"
              value={signupPasswordCheck}
              onChange={(e) =>
                setSignupPasswordCheck(validation.regexPassword(e.target.value))
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
