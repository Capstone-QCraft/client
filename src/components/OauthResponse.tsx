// src/pages/OauthResponse.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const OauthResponse: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 현재 URL에서 JWT 토큰 추출
    const token = window.location.pathname.split("/").pop();

    if (token) {
      console.log(token);
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("access_token", token);
      dispatch(login());
      // 홈 화면으로 리다이렉트
      navigate("/");
    } else {
      console.error("토큰이 없습니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OauthResponse;
