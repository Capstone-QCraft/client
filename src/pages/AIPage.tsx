import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ChatQ from "../components/ChatQ";
import "./AIPage.css";

const AIPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
      <div className="ai-container">
        <div className="ai-inner">
          <ChatQ question="질문1이 있습니다요?" />
          <ChatQ question="질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?질문1이 있습니다요?" />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
