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
      <img
        src="/images/ai1.webp"
        alt="메인 이미지"
        width="100%"
        style={{
          transform: `scale(${1 - y / 5000})`,
          borderRadius: `${y / 10}px`,
        }}
      />

      <div className="introduce-container">
        <h1>면접준비의 첫걸음, Qcraft</h1>
        <p>에이아이 뭐시기~ 설명 뭐시기~</p>
        <p>이미지 뭐시기</p>
      </div>
    </div>
  );
};

export default MainPage;
