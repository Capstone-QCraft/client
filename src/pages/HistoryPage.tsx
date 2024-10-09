import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";

const HistoryPage = () => {
  const questions = [
    "질문1 : 질문1의 내용을 길게 써보자, 더 길게 써보도록 하자, 너비의 길이는?",
    "질문2",
    "질문3",
    "질문4",
    "질문5",
  ];
  const answers = [
    "답변1: 답변1의 내용을 길게 써보자, 더 길게 써보도록 하자, 너비의 길이는?",
    "답변2",
    "답변3",
    "답변4",
    "답변5",
  ];
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
