import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./AIPage.css";

const AIPage = () => {
  const questions = ["질문1", "질문2", "질문3", "질문4", "질문5"];
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
