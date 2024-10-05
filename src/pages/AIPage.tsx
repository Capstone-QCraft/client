import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./AIPage.css";

const AIPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
      <div className="ai-container">
        <div className="ai-inner">
          {/* <Chat question="밥 드셨나요?" answer="그럼요~!" /> */}
          <Chat
            question="팀 프로젝트를 진행하면서 어려운 점은 무엇이었으며, 어떻게 해결하여 나갔나요?"
            answer="팀프로젝트를 진행하면서 어려웠던 점은 ~ 이고, 그 것을 ~로 해결하였습니다."
          />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
