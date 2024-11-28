import { useEffect, useState, useRef } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./AIPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { interviewApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

const AIPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [interviewId, setInterviewId] = useState("");
  const [questions, setQuestions] = useState<string[]>(["", "", ""]);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [isLoadingMakeQ, setIsLoadingMakeQ] = useState(false);
  const [isLoadingPeedback, setIsLoadingPeedback] = useState(false);

  // 경과 시간을 저장하는 상태 변수와 호버 상태를 관리하는 변수 추가
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 타이머 ID를 저장하기 위한 useRef 추가
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 시간을 형식에 맞게 변환하는 함수
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hDisplay = h > 0 ? `${h}:` : "";
    const mDisplay = m < 10 ? `0${m}:` : `${m}:`;
    const sDisplay = s < 10 ? `0${s}` : `${s}`;

    return hDisplay + mDisplay + sDisplay;
  };

  const formattedTime = formatTime(elapsedTime);

  // 음성 결과를 저장하는 함수를 생성합니다.
  const handleVoice = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = newAnswers[index] + value;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!id) {
        navigate("/");
      } else {
        try {
          setIsLoadingMakeQ(true);
          const res = await interviewApi.generate(id);
          setInterviewId(res.data.interviewId);
          setQuestions(res.data.questions);

          // 질문 생성 후 타이머 시작
          if (!timerRef.current) {
            timerRef.current = setInterval(() => {
              setElapsedTime((prev) => prev + 1);
            }, 1000);
          }
        } catch (error) {
          alert("문제가 발생했습니다. 다시 시도해주세요.");
          navigate("/");
        } finally {
          setIsLoadingMakeQ(false);
        }
      }
    };

    fetchQuestions();

    // 클린업 함수: 컴포넌트 언마운트 시 타이머 정지
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [id, navigate]);

  const handleChange = (index: number, value: string) => {
    const newValues = [...answers];
    newValues[index] = value;
    setAnswers(newValues);
  };

  const handleFeedback = async () => {
    // todo 음성 인식 정지 버튼 누르지 않아도 반영
    setIsLoadingPeedback(true);
    const res = await interviewApi.feedback(interviewId, answers);
    navigate(`/histories/history/${res.data.interviewId}`);
    // setIsLoadingPeedback(false);
    // console.log(answers);
  };

  if (isLoadingMakeQ) return <LoadingSpinner message="질문 생성 중..." />;
  if (isLoadingPeedback)
    return <LoadingSpinner message="AI 피드백 받는 중..." />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>AI 인터뷰</title>
      </Helmet>
      <div className="ai-container">
        <div className="ai-inner">
          {questions.map((v, i) => (
            <section key={i} className="ai-section">
              <Chat
                question={v}
                answer={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                handleVoice={(value) => handleVoice(i, value)}
              />
            </section>
          ))}
        </div>
      </div>
      <div className="ai-submit-container">
        <button
          className="ai-submit-button"
          onClick={handleFeedback}
          onMouseEnter={() => setIsHovered(true)} // 마우스 오버 시 호버 상태 변경
          onMouseLeave={() => setIsHovered(false)} // 마우스 리브 시 호버 상태 변경
        >
          {isHovered ? "면접 종료" : formattedTime}
        </button>
        <div className="ai-submit-button-border"></div>
      </div>
    </HelmetProvider>
  );
};

export default AIPage;
