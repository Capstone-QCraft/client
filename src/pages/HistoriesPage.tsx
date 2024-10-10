import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./HistoriesPage.css";

const HistoriesPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="histories-container">
        <div className="histories-inner">
          <div>2024.10.10, 프론트엔드, 입사지원서-양정운.pdf</div>
          <div>2024.10.09, 프론트엔드, 입사지원서-양정운.word</div>
          <div>2024.01.01, 백엔드, 자기소개서.pdf</div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoriesPage;
