import React, { useEffect, useState } from "react";
import "./MainPage.css";
import mainImg from "../assets/images/ai2.webp";

const MainPage = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setY(Math.min(500, window.scrollY));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startButton = () => {
    return (
      <div className="discription-container">
        <button className="button-start">지금 시작하기</button>
      </div>
    );
  };

  const discription = (h1: string, ps: string[]) => {
    return (
      <div className="discription-container">
        <h1>{h1}</h1>
        {ps.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="introduce-container">
        {discription("면접 준비의 첫걸음 AI와 함께, Qcraft", [
          "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
          "제출한 답변을 AI를 통해 피드백을 받아보세요",
        ])}
        {startButton()}
      </div>

      <img
        src={mainImg}
        alt="메인 이미지"
        width="100%"
        style={{
          transform: `scale(${1 - y / 5000})`,
          borderRadius: `${y / 10}px`,
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />

      {discription("면접 준비 막막하셨나요?", [
        "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
        "제출한 답변을 AI를 통해 피드백을 받아보세요",
      ])}

      {discription("서비스 이용 방법 이미지", [
        "입사 지원서 업로드 -> AI 면접 예상 질문 생성 -> 답변 제출 -> AI피드백",
      ])}
    </div>
  );
};

export default MainPage;
