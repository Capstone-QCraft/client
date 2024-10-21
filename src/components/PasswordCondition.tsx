import React, { useEffect, useState } from "react";

interface PasswordConditionProps {
  password: string;
}

export const regexTF = (password: string) => {
  return (
    password.length >= 8 &&
    password.length <= 20 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9\s]/.test(password)
  );
};

const PasswordCondition: React.FC<PasswordConditionProps> = ({ password }) => {
  // 비밀번호 조건
  const [over8, setOver8] = useState(false); // 8자 이상
  const [useUpperCase, setUseUpperCase] = useState(false); // 대문자 사용
  const [useLowerCase, setUseLowerCase] = useState(false); // 소문자 사용
  const [useNumber, setUseNumber] = useState(false); // 숫자 사용
  const [useSpecial, setUseSpecial] = useState(false); // 특수문자 사용

  useEffect(() => {
    if (password.length >= 8 && password.length <= 20) setOver8(true);
    else setOver8(false);
    if (/[A-Z]/.test(password)) setUseUpperCase(true);
    else setUseUpperCase(false);
    if (/[a-z]/.test(password)) setUseLowerCase(true);
    else setUseLowerCase(false);
    if (/[0-9]/.test(password)) setUseNumber(true);
    else setUseNumber(false);
    if (/[^a-zA-Z0-9\s]/.test(password)) setUseSpecial(true);
    else setUseSpecial(false);
  }, [password]);

  return (
    <div className="password-condition-container">
      <p style={over8 ? { color: "green" } : {}}>8~20자</p>
      <p style={useUpperCase ? { color: "green" } : {}}>대문자</p>
      <p style={useLowerCase ? { color: "green" } : {}}>소문자</p>
      <p style={useNumber ? { color: "green" } : {}}>숫자</p>
      <p style={useSpecial ? { color: "green" } : {}}>특수문자(~)</p>
    </div>
  );
};

export default PasswordCondition;
