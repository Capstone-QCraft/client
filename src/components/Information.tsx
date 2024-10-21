import React, { useRef, useState } from "react";
import "./Information.css";
import InputField from "./InputField";
import Button from "./Button";
import useWithdraw from "../hooks/useWithdraw";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import PasswordCondition, { regexTF } from "./PasswordCondition";
import useUpdateInfo from "../hooks/useUpdateInfo";
import useGetInfo from "../hooks/useGetInfo";

interface InformationProps {
  h2: string;
  contents: string[][];
}

enum ErrorMessages {
  EMPTY = "",
  OLD_PASSWORD_EMPTY = "기존 비밀번호를 입력해 주세요.",
  NEW_PASSWORD_EMPTY = "새 비밀번호를 입력해 주세요.",
  NEW_PASSWORD_CHECK_EMPTY = "비밀번호 확인을 입력해 주세요.",
  PASSWORD_REGEX = "8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
  NEW_PASSWORD_MISSMATCH = "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  OLD_PASSWORD_MISSMATCH = "기존 비밀번호가 일치하지 않습니다.",
}

const Information: React.FC<InformationProps> = ({ h2, contents }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(ErrorMessages.EMPTY);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);

  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleToggleWithdraw = () =>
    setShowWithdrawConfirm(!showWithdrawConfirm);
  const handleToggleChange = () => setShowPasswordChange(!showPasswordChange);

  const { data: infoData } = useGetInfo();
  const { refetch: updateInfoRefetch } = useUpdateInfo(
    infoData?.email,
    infoData?.name,
    oldPassword,
    newPassword
  );
  const { refetch: refetchWithdraw } = useWithdraw();

  // 비밀번호 변경 핸들러
  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(ErrorMessages.EMPTY);
    if (oldPassword === "") {
      // 기존 비밀번호 필드가 비어 있다면
      setErrorMessage(ErrorMessages.OLD_PASSWORD_EMPTY);
      if (oldPasswordRef.current) oldPasswordRef.current.focus();
    } else if (newPassword === "") {
      // 새 비밀번호 필드가 비어 있다면
      setErrorMessage(ErrorMessages.NEW_PASSWORD_EMPTY);
      if (newPasswordRef.current) newPasswordRef.current.focus();
    } else if (passwordCheck === "") {
      // 비밀번호 확인 필드가 비어 있다면
      setErrorMessage(ErrorMessages.NEW_PASSWORD_CHECK_EMPTY);
      if (passwordCheckRef.current) passwordCheckRef.current.focus();
    } else if (!regexTF(newPassword)) {
      // 비밀번호 정규식
      setErrorMessage(ErrorMessages.PASSWORD_REGEX);
      if (newPasswordRef.current) newPasswordRef.current.focus();
    } else if (newPassword !== passwordCheck) {
      // 새 비밀번호와 비밀번호 확인이 같지 않다면
      setErrorMessage(ErrorMessages.NEW_PASSWORD_MISSMATCH);
      if (passwordCheckRef.current) passwordCheckRef.current.focus();
    } else {
      // todo 비밀번호 변경
      const { isSuccess } = await updateInfoRefetch();
      if (isSuccess) window.location.reload();
      else {
        // 기존 비밀번호가 일치하지 않다
        setErrorMessage(ErrorMessages.OLD_PASSWORD_MISSMATCH);
        if (oldPasswordRef.current) oldPasswordRef.current.focus();
      }
    }
  };

  // 회원 탈퇴 핸들러
  const handleWithdraw = async () => {
    const { isSuccess } = await refetchWithdraw();
    if (isSuccess) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="information-container">
      <h2 className="info-h2">{h2}</h2>
      {contents.map((content, i) => (
        <React.Fragment key={i}>
          <div
            className="information-inner"
            onClick={
              content[0] === "회원"
                ? handleToggleWithdraw
                : content[0] === "비밀번호"
                ? handleToggleChange
                : undefined
            }
          >
            <p className="info-title">{content[0]}</p>
            <p className="info-content">{content[1]}</p>
          </div>
          {showPasswordChange && content[0] === "비밀번호" && (
            <form
              onSubmit={handlePasswordChangeSubmit}
              className="password-change-container"
            >
              <InputField
                label="기존 비밀번호"
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                inputRef={oldPasswordRef}
              />
              <InputField
                label="새 비밀번호"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                inputRef={newPasswordRef}
              />
              <PasswordCondition password={newPassword} />
              <InputField
                label="비밀번호 확인"
                type="password"
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
                inputRef={passwordCheckRef}
              />
              <p className="error-message">{errorMessage}</p>
              <Button name="변경하기" type="submit" />
            </form>
          )}
          {i < contents.length - 1 && <hr className="user-hr"></hr>}
        </React.Fragment>
      ))}

      {showWithdrawConfirm && (
        <div className="withdraw-confirm-container">
          <button className="withdraw-button" onClick={handleWithdraw}>
            탈퇴하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Information;
