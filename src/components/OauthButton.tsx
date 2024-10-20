import React from "react";
import "./OauthButton.css";

interface OauthButtonProps {
  type: "kakao" | "google" | "naver";
}

const OauthButton: React.FC<OauthButtonProps> = ({ type }) => {
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

  return (
    <div className={`oauth-button-container ${type}`}>
      <a href={`/${type}-login`} className="oauth-button">
        {getButtonLabel()}
      </a>
    </div>
  );
};

export default OauthButton;
