import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./HistoriesPage.css";

const data = [
  { date: 241010, job: "fe", file: "입사지원서" },
  { date: 241009, job: "fe", file: "입사지원서" },
  { date: 241008, job: "fe", file: "자기소개서" },
  { date: 241007, job: "fe", file: "입사지원서" },
  { date: 241006, job: "fe", file: "자기소개서" },
  { date: 241005, job: "fe", file: "입사지원서" },
  { date: 241004, job: "fe", file: "자기소개서" },
  { date: 241003, job: "fe", file: "입사지원서" },
  { date: 241002, job: "fe", file: "자기소개서" },
  { date: 241001, job: "fe", file: "자기소개서" },

  { date: 240110, job: "be", file: "입사지원서" },
  { date: 240109, job: "be", file: "입사지원서" },
  { date: 240108, job: "be", file: "자기소개서" },
  { date: 240107, job: "be", file: "입사지원서" },
  { date: 240106, job: "be", file: "자기소개서" },
  { date: 240105, job: "be", file: "자기소개서" },
  { date: 240104, job: "be", file: "입사지원서" },
  { date: 240103, job: "be", file: "입사지원서" },
  { date: 240102, job: "be", file: "자기소개서" },
  { date: 240101, job: "be", file: "입사지원서" },
];

const HistoriesPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="histories-container">
        <div className="histories-inner">
          <div className="list-container">
            <div>날짜</div>
            <div>직종</div>
            <div>파일</div>
          </div>
          {data.map((v, i) => (
            <div className="list-container">
              <div>{v.date}</div>
              <div>{v.job}</div>
              <div>{v.file}</div>
            </div>
          ))}
          <div className="pagination-container">
            <div className="pagination-button">{"<<"}</div>
            <div className="pagination-button">{"<"}</div>
            <div className="pagination-button">1</div>
            <div className="pagination-button">2</div>
            <div className="pagination-button">3</div>
            <div className="pagination-button">4</div>
            <div className="pagination-button">5</div>
            <div className="pagination-button">6</div>
            <div className="pagination-button">7</div>
            <div className="pagination-button">8</div>
            <div className="pagination-button">9</div>
            <div className="pagination-button">10</div>
            <div className="pagination-button">{">"}</div>
            <div className="pagination-button">{">>"}</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoriesPage;
