// src/pages/OauthResponse.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import saveToken from "../utils/saveToken";

const OauthResponse: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.location.pathname.split("/").pop();
    if (token) {
      saveToken(token);
      dispatch(login());
      navigate("/");
    } else {
      console.error("토큰이 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default OauthResponse;
