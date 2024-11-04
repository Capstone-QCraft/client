import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./AIPage.css";
import useFeedback from "../hooks/useFeedback";
import useInterviewGenerate from "../hooks/useInterviewGenerate";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AIPage = () => {
  // const { data: generateData, refetch: generateRefetch } = useInterviewGenerate(
  //   sessionStorage.getItem("fileId")
  // );
  // const { data: feedbackData, refetch: feedbackRefetch } = useFeedback(
  //   sessionStorage.getItem("interviewId")
  // );
  // useEffect(() => {
  //   generateRefetch();
  //   console.log(generateData);
  // }, []);

  const questions = [
    "1. 창업동아리에서 비대면 심리상담 앱을 기획하셨는데, 기존 심리상담 서비스와 차별화된 '심리상담 게임'을 도입하게 된 구체적인 계기와 개발 과정에서의 어려움은 무엇이었나요?",
    "2. 다양한 게임 장르를 경험하셨는데, FPS에서 MMORPG로 전환하면서 느낀 게임 디자인의 차이점과 각 장르에서 배운 게임 기획적 요소는 무엇인가요?",
    "3. 군대 생활을 통해 '균형 잡힌 관계 유지'의 중요성을 깨달으셨다고 했는데, 이러한 경험이 게임 기획자로서 유저와의 관계를 설정하는 데 어떤 영향을 미칠 것이라고 생각하시나요?",
  ];
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const handleChange = (index: number, value: string) => {
    const newValues = [...answers];
    newValues[index] = value;
    setAnswers(newValues);
  };

  const navigate = useNavigate();

  const handleFeedback = () => {
    navigate("/histories/history/1");
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
      <div className="ai-submit-container">
        <button className="ai-submit-button" onClick={handleFeedback}>
          면접 종료{/* todo 시간 뛰워주고 hover시 면접 종료 뜨게 */}
        </button>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
