import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./AIPage.css";

const AIPage = () => {
  const questions = [
    "React에서 상태 관리 도구로 Redux를 사용하는 이유는 무엇인가요?",
    "CSR과 SSR의 차이점은 무엇인가요?",
    "React에서 Virtual DOM이란 무엇인가요? 그리고 왜 사용하는지 설명해 주세요.",
    "웹 성능 최적화를 위해 어떤 방법을 사용하나요?",
    "CORS 문제를 해결하는 방법은 무엇인가요?",
  ];
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    const newValues = [...answers];
    newValues[index] = value;
    setAnswers(newValues);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>AI질문</title>
      </Helmet>
      <div className="ai-container">
        <div className="ai-inner">
          {questions.map((v, i) => (
            <section key={i} className="ai-section">
              <Chat
                question={v}
                answer={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
              />
            </section>
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
