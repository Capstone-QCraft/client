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
import Modal from "../components/Modal";

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

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
      try {
        setIsLoading(true);
        const res = await interviewApi.history(id);
        setQuestions(res.data.interview.questions);
        setAnswers(res.data.interview.answers);
        setPositivePoint(res.data.interview.positivePoint);
        setImprovement(res.data.interview.improvement);
        setTotalPeedback(res.data.interview.overallSuggestion);
        setIsLoading(false);
      } catch (error: any) {
        if (error.response.status === 404) {
          navigate("/error");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const deleteHandele = () => {
    interviewApi.delHistory(id!);
    if (window.history.length > 1) {
      // 세션 스토리지에 새로고침 요청 플래그 설정
      sessionStorage.setItem("refresh", "true");
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const cancelHandele = () => closeModal();

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
          <br />
          <Button name="기록 내보내기" type="button" onClick={exportHandle} />
          <br />
          <br />
          <button className="history-delete" onClick={openModal}>
            인터뷰 기록 삭제
          </button>
          <div style={{ height: "100px" }}></div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>정말 삭제하겠습니까?</p>
        <div className="history-modal">
          <button className="history-del" onClick={deleteHandele}>
            삭제
          </button>
          <button className="history-can" onClick={cancelHandele}>
            취소
          </button>
        </div>
      </Modal>
    </HelmetProvider>
  );
};

export default HistoryPage;
