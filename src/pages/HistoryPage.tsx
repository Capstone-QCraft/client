import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";

const HistoryPage = () => {
  const questions = ["질문1", "질문2", "질문3", "질문4", "질문5"];
  const answers = ["답변1", "답변2", "답변3", "답변4", "답변5"];
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="history-container">
        <div className="history-inner">
          {questions.map((v, i) => (
            <Chat key={i} question={v} answer={answers[i]} isHistory={true} />
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoryPage;
