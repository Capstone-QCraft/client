import React from "react";
import error404 from "../assets/images/error404.webp";
import Discription from "../components/Discription";

const ErrorPage = () => {
  return (
    <>
      <img src={error404} alt="error404" height="100vh"></img>
      <Discription
        h1="404 ERROR"
        ps={[
          "죄송합니다. 페이지를 찾을 수 없습니다.",
          "존재하지 않는 주소를 입력하셨거나",
          "요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.",
        ]}
        btn="Qcraft 홈"
      />
    </>
  );
};

export default ErrorPage;
