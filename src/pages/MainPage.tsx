import React, { useEffect, useState } from "react";
import "./MainPage.css";

const MainPage = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setY(Math.min(500, window.scrollY));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="introduce-container">
        <div className="introduce-left">
          <h1>면접 준비의 첫걸음 AI와 함께, Qcraft</h1>
          <p>입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.</p>
          <p>제출한 답변을 AI를 통해 피드백을 받아보세요</p>
        </div>
        <div className="introduce-right">
          <button className="button-start">지금 시작하기</button>
        </div>
      </div>

      <img
        src="/images/ai1.webp"
        alt="메인 이미지"
        width="100%"
        style={{
          transform: `scale(${1 - y / 5000})`,
          borderRadius: `${y / 10}px`,
          aspectRatio: "16/9",
          objectFit: "cover",
        }}
      />

      <div className="introduce-container">
        <h1>면접 준비 막막하셨나요?</h1>
        <p>입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.</p>
        <p>제출한 답변을 AI를 통해 피드백을 받아보세요</p>
      </div>

      <div className="introduce-container">
        <h1>서비스 이용 방법 이미지</h1>
        <p>
          입사 지원서 업로드 -&gt; AI 면접 예상 질문 생성 -&gt; 답변 제출 -&gt;
          AI피드백
        </p>
      </div>
    </div>
  );
};

export default MainPage;
