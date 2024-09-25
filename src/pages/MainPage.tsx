import React, { useEffect, useState } from "react";
import mainImg from "../assets/images/ai2.webp";
import Discription from "../components/Discription";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const navigate = useNavigate();
  const [y, setY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setY(Math.min(500, window.scrollY));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Qcraft</title>
      </Helmet>
      <Discription
        h1="면접 준비의 첫걸음 AI와 함께, Qcraft"
        ps={[
          "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
          "제출한 답변을 AI를 통해 피드백을 받아보세요",
        ]}
        btn="지금 시작하기"
        onClick={() => navigate("/ai")}
      />

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

      <Discription
        h1="면접 준비 막막하셨나요?"
        ps={[
          "입사 지원서를 토대로 AI가 예상 질문을 뽑아줍니다.",
          "제출한 답변을 AI를 통해 피드백을 받아보세요",
        ]}
      />

      <Discription
        h1="서비스 이용 방법 이미지"
        ps={[
          "입사 지원서 업로드 -> AI 면접 예상 질문 생성 -> 답변 제출 -> AI피드백",
        ]}
      />
    </div>
  );
};

export default MainPage;
