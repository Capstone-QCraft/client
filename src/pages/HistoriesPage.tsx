import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./HistoriesPage.css";
import { useNavigate } from "react-router-dom";

const data = [
  { date: "2024.10.10", job: "fe", file: "입사지원서" },
  { date: "2024.10.09", job: "fe", file: "입사지원서" },
  { date: "2024.10.08", job: "fe", file: "자기소개서" },
  { date: "2024.10.07", job: "fe", file: "입사지원서" },
  { date: "2024.10.06", job: "fe", file: "자기소개서" },
  { date: "2024.10.05", job: "fe", file: "입사지원서" },
  { date: "2024.10.04", job: "fe", file: "자기소개서" },
  { date: "2024.10.03", job: "fe", file: "입사지원서" },
  { date: "2024.10.02", job: "fe", file: "자기소개서" },
  { date: "2024.10.01", job: "fe", file: "자기소개서" },

  { date: "2024.01.10", job: "be", file: "입사지원서" },
  // { date: "2024.01.09", job: "be", file: "입사지원서" },
  // { date: "2024.01.08", job: "be", file: "자기소개서" },
  // { date: "2024.01.07", job: "be", file: "입사지원서" },
  // { date: "2024.01.06", job: "be", file: "자기소개서" },
  // { date: "2024.01.05", job: "be", file: "자기소개서" },
  // { date: "2024.01.04", job: "be", file: "입사지원서" },
  // { date: "2024.01.03", job: "be", file: "입사지원서" },
  // { date: "2024.01.02", job: "be", file: "자기소개서" },
  // { date: "2024.01.01", job: "be", file: "입사지원서" },
];

const HistoriesPage = () => {
  const [currentPage, setCurrentPage] = useState("1");
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="histories-container">
        <div className="histories-inner">
          <div className="list-header">
            <div className="t1">번호</div>
            <div className="t2">파일</div>
            <div className="t3">날짜</div>
          </div>
          {data.map((v, i) => (
            <div
              key={i}
              className="list-body"
              onClick={() => {
                // todo 상세 페이지로 이동
                navigate(`/histories/history/${i + 1}`);
              }}
            >
              <div className="t1">{i + 1}</div>
              <div className="t2">{v.file}</div>
              <div className="t3">{v.date}</div>
            </div>
          ))}
          <div className="pagination-container">
            <div className="pagination-button">{"< 이전"}</div>
            <input
              type="number"
              className="pagination-input"
              value={currentPage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentPage(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  console.log(currentPage);
                  // todo 페이지 이동
                }
              }}
            />
            <div>&nbsp; / {Math.ceil(data.length / 10)}</div>
            <div className="pagination-button">{"다음 >"}</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoriesPage;
