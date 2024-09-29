import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Information from "../components/Information";
import "./UserPage.css";

const UserPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>내정보</title>
      </Helmet>
      <div className="user-container">
        <Information
          h2="계정 정보"
          contents={[
            ["이름", "양정운"],
            ["이메일", "yp071704@naver.com"],
          ]}
        ></Information>
        <Information
          h2="계정 관리"
          contents={[
            ["비밀번호", "변경"],
            ["회원", "탈퇴"],
          ]}
        ></Information>
      </div>
    </HelmetProvider>
  );
};

export default UserPage;
