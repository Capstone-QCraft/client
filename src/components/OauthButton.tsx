import React, { useEffect, useState } from "react";
import "./OauthButton.css";

import google_logo from "../assets/images/google.svg";
import kakao_logo from "../assets/images/kakao.svg";
import naver_light_logo from "../assets/images/naver_light.svg";
import naver_dark_logo from "../assets/images/naver_dark.svg";

interface OauthButtonProps {
  type: "kakao" | "google" | "naver";
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const OauthButton: React.FC<OauthButtonProps> = ({ type }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const getButtonLabel = () => {
    switch (type) {
      case "kakao":
        return "카카오 로그인";
      case "google":
        return "구글 로그인";
      case "naver":
        return "네이버 로그인";
      default:
        return "";
    }
  };

  const getButtonLogo = () => {
    switch (type) {
      case "kakao":
        return kakao_logo;
      case "google":
        return google_logo;
      case "naver":
        return isDarkMode ? naver_dark_logo : naver_light_logo;
    }
  };

  return (
    <button
      className={`oauth-button-container oauth-button-${type}`}
      onClick={() =>
        (window.location.href = `${SERVER_URL}/member/oauth2/${type}`)
      }
    >
      <img
        className="oauth-button-img"
        src={getButtonLogo()}
        alt={getButtonLabel()}
      />
      {getButtonLabel()}
    </button>
  );
};

export default OauthButton;
