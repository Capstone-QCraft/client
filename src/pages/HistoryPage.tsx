import { HelmetProvider, Helmet } from "react-helmet-async";
import Chat from "../components/Chat";
import "./HistoryPage.css";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { interviewApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import LoadingSpinner from "../components/LoadingSpinner";

const HistoryPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObserver(ref);

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [positivePoint, setPositivePoint] = useState([]);
  const [improvement, setImprovement] = useState([]);
  const [totalPeedback, setTotalPeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const exportHandle = async () => {
    if (exportRef.current) {
      exportRef.current.classList.add("no-animation");
      const canvas = await html2canvas(exportRef.current);
      exportRef.current.classList.remove("no-animation");
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "interview.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    if (!id) {
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      navigate("/histories");
    } else {
      setIsLoading(true);
      const res = await interviewApi.history(id);
      setQuestions(res.data.interview.questions);
      setAnswers(res.data.interview.answers);
      setPositivePoint(res.data.interview.positivePoint);
      setImprovement(res.data.interview.improvement);
      setTotalPeedback(res.data.interview.overallSuggestion);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="history-container">
        <div className="history-inner">
          <div ref={exportRef}>
            {questions.map((v, i) => (
              <Chat
                key={i}
                question={v}
                answer={answers[i]}
                positivePoint={positivePoint[i]}
                improvement={improvement[i]}
                isHistory={true}
              />
            ))}
            <div style={{ height: "100px" }}></div>
            <div
              className={`chat-inner chat-p ${isInViewport ? "show-item" : ""}`}
              ref={ref}
            >
              <span className="chat-t">전체적인 피드백</span>
              <br />
              <br />
              {totalPeedback}
            </div>
          </div>
          <Button name="기록 내보내기" type="button" onClick={exportHandle} />
          <div style={{ height: "100px" }}></div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default HistoryPage;
